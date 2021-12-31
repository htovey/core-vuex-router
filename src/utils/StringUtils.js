const isNullOrEmpty = function (value) {
    if (value === null || value === undefined || value === 'null') {
        return true;
    }

    if (typeof value === String) {
        return value === '' || value === ' ';
    }

    if (typeof value === "object") {
        return value === {};
    }

    if (typeof value === Array) {
        return value === [];
    }
};

export default {isNullOrEmpty};