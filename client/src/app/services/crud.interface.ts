export interface CRUD {
    create(object);
    edit(object);
    delete(object);
    getOne(id);
}