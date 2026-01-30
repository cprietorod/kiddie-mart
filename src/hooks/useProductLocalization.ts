import { useLocale } from 'next-intl';
import { Product } from '@/types/kiddieMart';

export function useProductLocalization() {
    const locale = useLocale();

    const getProductName = (product: Product) => {
        if (locale === 'en' && product.name_en) {
            return product.name_en;
        }
        return product.name;
    };

    const getProductCategory = (product: Product) => {
        if (locale === 'en' && product.category_en) {
            return product.category_en;
        }
        return product.category;
    };

    return { getProductName, getProductCategory, locale };
}
