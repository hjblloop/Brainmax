export function toLowerCaseAll(...args: (string | string[])[]): (string | string[])[] {
    return args.map(arg => {
        if (Array.isArray(arg)) {
            return arg.map(str => str.toLowerCase());
        } else {
            return arg.toLowerCase();
        }
    });
};

export function clean(rawString: string[]){
    // return rawString.map((thing) => thing.replace(/\\n/g, '\n').replace(/\.  \*\*/g, ''));
    return rawString.map((thing) => thing.replace(/\\n/g, '\n'));
};