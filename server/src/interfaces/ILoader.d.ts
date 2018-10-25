interface ConfigLoader {
    loadConfig?(): void;
}
export default interface ILoader extends ConfigLoader {
}