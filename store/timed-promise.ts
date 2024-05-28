const timedPromise = (promise, timeout) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error('Timeout'));
        }, timeout);

        promise.then(resolve, reject).finally(() => {
            clearTimeout(timeoutId);
        });
    });
};

export default timedPromise;