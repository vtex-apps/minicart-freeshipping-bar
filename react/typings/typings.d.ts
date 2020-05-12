declare module '*.gql' {
	const content: any
	export default content
}
declare module '*.svg' {
	const content: string
	export default content
}
interface Anything {
	[key: string]: any
}