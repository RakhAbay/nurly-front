export interface ICategory {
    categoryId: string;
    name: string;
    isCustom: boolean;
    isActive: boolean;
    userIds4Custom: string[];
}

export interface ISubcategory {
    subCategoryId: string;
    categoryId: string;
    name: string;
    isCustom: boolean;
    isActive: boolean;
    userIds4Custom: string[];
} 
