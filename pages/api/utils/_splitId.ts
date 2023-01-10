const splitId = (id: string): number => {
    const separatedId = id.split('|');
    return parseInt(separatedId[separatedId.length - 1]);
}

export default splitId;
