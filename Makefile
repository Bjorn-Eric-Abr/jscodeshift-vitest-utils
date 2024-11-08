clear:
	clear
component-dry: clear
	@npx jscodeshift --dry --print --transform=codemods/MyTransform.ts --parser=tsx src
