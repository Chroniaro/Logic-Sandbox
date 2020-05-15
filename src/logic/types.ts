export interface Specification {
    uuid: string,
    name: string
}

export interface SpecificationDragItem {
    type: 'specification',
    specification: Specification
}

export function isSpecificationDragItem(item: any): item is SpecificationDragItem {
    if (item === null)
        return false;

    return item.type === 'specification';
}