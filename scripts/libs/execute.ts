import { spawn } from "child_process";

export function exec(command: string, args: readonly string[] = [], callback?: (code: number | null) => void) {
    var spRet = spawn(command, args, {
        windowsHide: true,
    });
    spRet.stdout.setEncoding("utf8");
    spRet.stdout.on('data', function (data) {
        process.stdout.write(data);
    });

    spRet.stderr.setEncoding('utf8');
    spRet.stderr.on('data', function (data) {
        process.stderr.write(data);
    });

    spRet.on('close', (code) => {
        if (callback) callback(code);
    })
}

export function execAsync(command: string, args: readonly string[] = []): Promise<number | null> {
    return new Promise((resolve, reject) => {
        exec(command, args, (code) => {
            resolve(code);
        });
    });
}