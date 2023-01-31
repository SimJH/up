/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-case-declarations */
import type { DatabaseRecord, Value, WhereConditions } from '../../types';

type QueryType = 'select' | 'insert' | 'update' | 'delete';

export class SQLBuilder {
  private _tableName?: string;
  private _type?: QueryType;
  private _values?: DatabaseRecord;
  private _limit?: number;
  private _orderTarget?: string;
  private _by?: 'desc' | 'asc';
  private _condition?: WhereConditions;

  private stringify(value: Value): string {
    if (typeof value === 'string') {
      return `"${value}"`;
    } else if (value === null) {
      return 'null';
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${value}`;
  }

  table(tableName: string): this {
    this._tableName = tableName;
    return this;
  }

  type(type: QueryType): this {
    this._type = type;
    return this;
  }

  values(values: DatabaseRecord): this {
    this._values = values;
    return this;
  }

  where(condition: WhereConditions): this {
    this._condition = condition;
    return this;
  }

  limit(limit: number): this {
    this._limit = limit;
    return this;
  }

  orderBy(target: string, by: 'desc' | 'asc'): this {
    this._orderTarget = target;
    this._by = by;
    return this;
  }

  build(): string {
    if (!(this._type && this._tableName)) {
      throw Error('invalid query type or table name');
    }
 
    const WHERE_CONDITION = this._condition && Object.entries(this._condition)
      .map(([column, { symbol, value }]) => {
        return `${column} ${symbol} ${this.stringify(value)}`;
      })
      .join(' AND ');
    const WHERE_STATEMENTS = WHERE_CONDITION ? `WHERE ${WHERE_CONDITION}` : '';

    switch (this._type) {
      case 'select':
        const shouldOrdering = this._orderTarget && this._by;
        const ORDER_BY_STATEMENTS = shouldOrdering
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ? `ORDER BY ${this._orderTarget!} ${this._by!}`
          : '';

        const LIMIT_CONSTRAINT = this._limit !== undefined
          ? `LIMIT ${this._limit}`
          : '';

        return `
          SELECT * FROM ${this._tableName}
          ${WHERE_STATEMENTS}
          ${ORDER_BY_STATEMENTS}
          ${LIMIT_CONSTRAINT};
        `;

      case 'insert':
        const VALUE_COLUMNS = Object.keys(this._values ?? {}).join(',');
        const VALUES = Object
          .values(this._values ?? {})
          .map((value) => this.stringify(value))
          .join(',');

        return `
          INSERT INTO ${this._tableName} (${VALUE_COLUMNS})
          VALUES (${VALUES});
        `;

      case 'update':
        const SET_STATEMENTS = Object
          .entries(this._values ?? {})
          .map(([column, value]) => `${column} = ${this.stringify(value)}`)
          .join(',');

        return `
          UPDATE ${this._tableName}
          SET ${SET_STATEMENTS}
          ${WHERE_STATEMENTS}
        `;

      case 'delete':
        return `
          DELETE FROM ${this._tableName}
          ${WHERE_STATEMENTS}
        `;
    }
  }
}