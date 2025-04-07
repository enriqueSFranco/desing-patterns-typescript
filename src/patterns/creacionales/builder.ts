class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`Configuracion de la computadore:
      CPU: ${this.cpu}\n
      RAM: ${this.ram}\n
      ALMACENAMIENTO: ${this.storage}\n
      GPU: ${this.gpu}
    `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;

    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;

    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;

    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;

    return this;
  }

  build() {
    return this.computer;
  }
}

class Query {
  public table: string = ''
  public columns: string = '*'
  public conditions: string = ''
  public conditionParams: any[] = []
  public orderBy: string = ''
  public limit: number = 0

  constructor(table: string) {
    this.table = table
  }

  public setColumns(columns: string[]): void {
    this.columns = columns.join(',');
  }

  setConditions(conditions: string[], params: any[]): void {
    this.conditions = conditions.join(' AND ')
    this.conditionParams = params
  }

  public setOrderBy(column: string, direction: 'ASC' | 'DESC'): void {
    this.orderBy = `${column} ${direction}`;
  }

  public setLimit(value: number): void {
    this.limit = value;
  }
}

class QueryBuilder {
  private query: Query

  constructor(table: string) {
    this.query = new Query(table)
  }

  select(...columns: string[]): QueryBuilder {
    this.query.setColumns(columns)
    return this
  }

  where(conditions: string[], params: any[] = []): QueryBuilder {
    this.query.setConditions(conditions, params)
    return this
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.query.setOrderBy(column, direction)
    return this
  }

  limit(value: number): QueryBuilder {
    this.query.setLimit(value)
    return this
  }

  execute(params: any[] = []) {
    let query: string = `SELECT ${this.query.columns} `

    if (this.query.table)
      query += `FROM ${this.query.table} `

    if (this.query.conditions.trim())
      query += `WHERE ${this.query.conditions}`

    if (this.query.orderBy.trim())
      query += `ORDER BY ${this.query.orderBy} `

    if (this.query.limit > 0)
      query += `LIMIT ${this.query.limit}`


    const allParams = [...this.query.conditionParams, ...params]

    return {query, allParams}
  }

}


function main() {
    const basicComputer: Computer = new ComputerBuilder()
      .setCPU('Intel Core 2 Dúo')
      .setRAM('4GB')
      .setStorage('256GB')
      .build()

    console.log('Basic Computer:\n')
    basicComputer.displayConfiguration()


    const gamingComputer: Computer = new ComputerBuilder()
      .setCPU('Inter i9')
      .setRAM('32GB')
      .setStorage('1TB SSD')
      .setGPU('Nvidia RTX 5090')
      .build()

    console.log('\nGaming Computer:\n')
    gamingComputer.displayConfiguration()

    // QueryBuilder
    const queryBuilder = new QueryBuilder("users")
      .select("id", "name", "age")
      .where(["id = ?", "name = ?"], [1, 'John Doe'])
      .orderBy("id", "DESC")
      .limit(10)
    const {query, allParams} = queryBuilder.execute()
    console.log(query)
    console.log(allParams)
}

main()
