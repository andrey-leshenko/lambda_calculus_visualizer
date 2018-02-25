function check(b)
{
	if (!b)
		throw 'Syntax Error';
}

function readSymbol(tokens)
{
	check(tokens.length > 0);
	return {type: 'symbol', name: tokens.shift()};
}

function readApplicationList(tokens)
{
	var prev = null;

	while (tokens.length > 0 && tokens[0][0] != ')')
	{
		var expr = readExpr(tokens);

		if (!prev)
			prev = expr;
		else
			prev = {type: 'apply', lhs: prev, rhs: expr};
	}

	return prev;
}

function readExpr(tokens)
{
	var head = tokens.shift();

	if (head == 'L')
	{
		var bound = readSymbol(tokens);
		var dot = tokens.shift();
		check(dot == '.');
		var value = readApplicationList(tokens);

		return {type: 'lambda', bound: bound, value: value};
	}
	else if (head == '(')
	{
		var value = readApplicationList(tokens);

		check(tokens.length > 0);
		check(tokens.shift() == ')');

		return value;
	}
	else if ('a' <= head[0].toLowerCase() && head[0].toLowerCase() <= 'z')
	{
		tokens.unshift(head);
		return readSymbol(tokens);
	}
}

function parseLambda(code)
{
	var tokenRegex = /\s*(L|\.|\(|\)|\w+(?:\w|\d)*)/g;

	codeTokens = code.match(tokenRegex);
	codeTokens = codeTokens.map((x) => x.trim());

	try {
		tree = readApplicationList(codeTokens);
		return tree;
	}
	catch(e) {
		console.error('Error: ' + e);
		return null;
	}
}
