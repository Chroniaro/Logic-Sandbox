export interface Specification {
    uuid: string,
    name: string
}

export interface SpecificationDragItem {
    type: 'specification',
    specification: Specification
}