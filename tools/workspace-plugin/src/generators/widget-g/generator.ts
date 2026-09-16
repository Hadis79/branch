import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readNxJson,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';

import { WidgetGGeneratorSchema } from './schema';

const routeGroups = {
  main: '(main)',
  auth: '(auth)',
  landing: '(landing)',
} as const;

export default async function (tree: Tree, schema: WidgetGGeneratorSchema) {
  const nxJsonConf = readNxJson(tree);

  schema.app = schema.app || schema.project || nxJsonConf!.defaultProject;

  if (!schema.app) {
    throw new Error('No app provided. Use --app=<projectName> or set a defaultProject in nx.json');
  }

  const projConf = readProjectConfiguration(tree, schema.app);

  if (projConf.projectType !== 'application') {
    throw new Error(`Project "${schema.app}" is not an application!`);
  }

  schema.pageName = schema.name;

  const routeGroup = routeGroups[schema.group ?? 'main'];

  const widgetRoot = joinPathFragments(projConf.root, 'src', 'app', routeGroup, schema.pageName);

  if (schema.action === 'remove') {
    if (!tree.exists(widgetRoot)) {
      throw new Error(`Widget "${schema.name}" not found at "${widgetRoot}".`);
    }

    tree.delete(widgetRoot);

    await formatFiles(tree);

    return () => {
      console.log(`🗑️ Widget '${schema.name}' has been removed from '${widgetRoot}'.`);
    };
  }

  generateFiles(tree, joinPathFragments(__dirname, './files'), widgetRoot, {
    ...schema,
    ...names(schema.name),
    tmpl: '',
  });

  await formatFiles(tree);

  return () => {
    console.log(`✅ Widget '${schema.name}' has been generated in '${schema.app}' at '${widgetRoot}'.`);
  };
}
