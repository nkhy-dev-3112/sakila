export class CategoryModel {
  public readonly categoryId: number;

  public readonly name: string;

  public readonly lastUpdate: Date;

  constructor(categoryId: number, name: string, lastUpdate: Date) {
    this.categoryId = categoryId;
    this.name = name;
    this.lastUpdate = lastUpdate;
  }

  public toJson(): Record<string, any> {
    return {
      category_id: this.categoryId,
      name: this.name,
      last_update: this.lastUpdate,
    };
  }
}
