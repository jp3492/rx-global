export declare const setGlobalState: (id: string, value: any) => void;
export declare const getGlobalState: (id: string) => any;
export declare const updateGlobalState: (id: string, cb: Function) => void;
export declare const subGlobalState: (id: string, cb: Function) => void;
export declare const unsubGlobalState: (id: string, cb: Function) => void;
export declare const resetGlobalState: (id: string) => void;
export declare const resetGlobalStates: (ids: string[]) => void;
export declare const useGlobalState: (id: string, initialValue?: any) => [any, Function];
