export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-NI', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  } 