# anycop👮‍♂️

This is a tool to visualize "any" inferences included in the project code. Any type comes even if you don't want to. No matter how careful you are, once a library has been delivered, it cannot be prevented. Also, you may get lost in the code when you were in a hurry temporarily.

Take advantage of this tool to keep type safe code from getting lost or compromised. Once the situation is visualized, you can understand the problem and share it with the team. It would be great if You had time to work on improving the type safety coverage.

Any is not ruffian. Without TypeScript this specification would have been impossible to apply static typing to the current JavaScript ecosystem. Build better relationships with "any" with this tool.



## What will this do?👮‍♀️
When executed in the current directory of a TypeScript project, "any" inferred parts will be reported. The file path and kind found are logged. Then, the totals to be inspected and the type safety coverage are reported.

VScode is great, and if you run it with the built-in command line tool, you can jump to the corresponding location by pressing the output file path.

```terminal
$ npm i -D anycop
$ anycop
/~/anycop/src/log.ts:9:17 👮‍♂️ < AsExpression
┌──────────────────────┬────────────┬──────────┬────────────────────┐
│                      │ CheckCount │ AnyCount │ TypeSafe Coverage  │
├──────────────────────┼────────────┼──────────┼────────────────────┤
│ ParameterDeclaration │ 42         │ 0        │ 1                  │
├──────────────────────┼────────────┼──────────┼────────────────────┤
│ BindingElement       │ 8          │ 0        │ 1                  │
├──────────────────────┼────────────┼──────────┼────────────────────┤
│ FunctionDeclReturn   │ 9          │ 0        │ 1                  │
├──────────────────────┼────────────┼──────────┼────────────────────┤
│ ArrowFunctionReturn  │ 13         │ 0        │ 1                  │
├──────────────────────┼────────────┼──────────┼────────────────────┤
│ AsExpression         │ 3          │ 1        │ 0.6666666666666667 │
├──────────────────────┼────────────┼──────────┼────────────────────┤
│ Total                │ 75         │ 1        │ 0.9866666666666667 │
└──────────────────────┴────────────┴──────────┴────────────────────┘
```

## How far it be detected?🚨
With the power of the TypeScript CompilerAPI, it can detect "any" inferences that are not mentioned in the code.

### ParameterDeclaration
It detects not only the explicit annotation of the argument but also the case where the type definition referred to is equivalent to "any".

```typescript
// annotation of "any" at ParameterDeclaration (a & b)
function greet(message: any) {
  return message
}
```


### BindingElement
Detects when a reference expanded by an object is inferred by "any".

```typescript
type Props = { a: any, b: any }
// inferred "any" at BindingElement (a & b)
function greet({ a, b }: Props) {
  return { a, b }
}
```


### FunctionDeclReturn
It detects return types that have become "any", as well as explicit return type "any" annotations.

```typescript
function greet() {
  const message: any = 'hello'
  // inferred "any" at FunctionDeclReturn
  return message
}
```


### ArrowFunctionReturn
It detects return types that have become "any", as well as explicit return type "any" annotations.

```typescript
const abc = (param: string) => {
  switch (param) {
    case 'a':
      return true
    case 'b':
      return false
    case 'c':
      return '' as any
  }
  // inferred "any" at ArrowFunctionReturn
}
```


### AsExpression
Detect assertions by "as" keywords.

```typescript
function greet() {
  return 'hello' as any // at AsExpression
}
```

