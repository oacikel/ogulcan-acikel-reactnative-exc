export function formatPrice(price: number, currency: string = 'TRY'): string {
    const formattedPrice = new Intl.NumberFormat('tr', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);

    // Had to do some workarounds to abide the designs. Might need to refactor this later.
    return currency === 'TRY' ? `${formattedPrice.replace('₺', '').trim()} TL` : formattedPrice;
}

export function formatTimestampToDateTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    
    // todo: There ought to be a global solution for this
    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
}

export default {
    formatPrice,
    formatTimestampToDateTime
}