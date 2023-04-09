// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadDBCompiler = async (go: any, url: string) => {
	if ('instantiateStreaming' in WebAssembly) {
		const obj = await WebAssembly.instantiateStreaming(fetch(url), go.importObject);
		const wasm = obj.instance;
		go.run(wasm);
		return wasm;
	} else {
		const resp = await fetch(url);
		const bytes = await resp.arrayBuffer();
		const obj = await WebAssembly.instantiate(bytes, go.importObject);
		const wasm = obj.instance;
		go.run(wasm);
		return wasm;
	}
};

export const stringToWASMBuffer = (wasm: WebAssembly.Instance, string: string) => {
	const { memory, malloc } = wasm.exports;
	// Encode the string in utf-8.
	const encoder = new TextEncoder();
	const bytes = encoder.encode(string);
	// Copy the string into memory allocated in the WebAssembly
	const ptr: number = malloc(bytes.byteLength);
	const buffer = new Uint8Array(memory.buffer, ptr, bytes.byteLength + 1);
	buffer.set(bytes);
	return { ptr, length: bytes.byteLength };
};

export const WASMBufferToString = (wasm: WebAssembly.Instance, ptr: number, length: number) => {
	const { memory, free } = wasm.exports;
	try {
		// The pointer is a multi byte character array encoded with utf-8.
		const array = new Uint8Array(memory.buffer, ptr, length);
		const decoder = new TextDecoder();
		const string = decoder.decode(array);
		return string;
	} finally {
		// Free the memory sent to use from the WebAssembly instance.
		// free(ptr + length);
	}
};
