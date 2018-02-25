function draw()
{
	var text = document.getElementById('editor').value;
	var tree = parseLambda(text);
	var jsonTree = JSON.stringify(tree, null, 4);
	document.getElementById('out').innerText = jsonTree;

	console.log(tree);
	console.log(jsonTree);
}
