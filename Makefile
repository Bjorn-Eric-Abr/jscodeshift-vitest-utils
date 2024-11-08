clear:
	clear
component-dry: clear
	@npx jscodeshift --dry --print --transform=codemods/MyComponent/transform.ts --parser=tsx src
