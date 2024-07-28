export const formatTimeRemaining = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = "";
    if (days > 0) timeString += `${days} day${days > 1 ? "s" : ""} `;
    if (hours > 0 || days > 0) timeString += `${hours} hour${hours > 1 ? "s" : ""} `;
    if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    if (remainingSeconds > 0 || minutes === 0) timeString += `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;

    return timeString.trim();
};
