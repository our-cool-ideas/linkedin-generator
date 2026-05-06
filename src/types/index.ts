export type GeneratorState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; post: string }
  | { status: 'error'; message: string }
