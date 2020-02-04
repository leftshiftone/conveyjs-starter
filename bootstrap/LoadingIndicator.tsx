export function LoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = "spinner-border spinner-border-sm lto-custom-loading-indicator";
    const loadingChild = document.createElement('span');
    loadingChild.className = "sr-only";

    loadingIndicator.appendChild(loadingChild);
    return loadingIndicator;
}
