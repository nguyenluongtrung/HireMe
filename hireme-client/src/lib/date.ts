export const formatDate = (date: string | Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("vi-VN");
};