export function toLowerCaseAll(...args: (string | string[])[]): (string | string[])[] {
    return args.map(arg => {
        if (Array.isArray(arg)) {
            return arg.map(str => str.toLowerCase());
        } else {
            return arg.toLowerCase();
        }
    });
};