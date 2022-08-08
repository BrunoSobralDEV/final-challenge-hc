export function formatPrice(value) {
    return value.toLocaleString( 'pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'brl'})
}