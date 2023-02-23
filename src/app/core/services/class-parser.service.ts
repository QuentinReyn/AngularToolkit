import { Injectable } from '@angular/core';
import * as ts from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class ClassParserService {

  extractPropertyNames(classCode: string): string[] {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      classCode,
      ts.ScriptTarget.ESNext,
      /*setParentNodes */ true
    );

    const classDeclarations = sourceFile.statements.filter(
      (node) => ts.isClassDeclaration(node)
    ) as ts.ClassDeclaration[];

    const attributeNames: string[] = [];

    for (const classDeclaration of classDeclarations) {
      const properties = classDeclaration.members.filter(
        (node) => ts.isPropertyDeclaration(node) || ts.isAccessor(node)
      ) as (
        | ts.PropertyDeclaration
        | ts.GetAccessorDeclaration
        | ts.SetAccessorDeclaration
      )[];

      const propertyNames = properties.map((property) => {
        const nameNode = property.name;
        if (ts.isIdentifier(nameNode)) {
          return nameNode.text;
        } else if (ts.isComputedPropertyName(nameNode)) {
          const expression = nameNode.expression;
          if (ts.isIdentifier(expression)) {
            return expression.text;
          }
        }
        return '';
      });

      attributeNames.push(...propertyNames);
    }

    return attributeNames.filter((name) => name !== '');
  }
}
