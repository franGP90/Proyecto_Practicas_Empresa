export interface Format {
    formatName: 'Tapa Dura' | 'Tapa Blanda' | 'Ebook',
    stock: number | undefined,
}
export interface Book {
    id: number,
    title: string,
    author: string,
    price: number,
    cover?: string,
    formats: Format[],
}