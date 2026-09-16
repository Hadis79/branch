export interface WidgetGGeneratorSchema {
  name: string;
  app?: string;
  project?: string;
  pageName?: string;

  group?: 'main' | 'auth' | 'landing';
  action?: 'add' | 'remove';
}
