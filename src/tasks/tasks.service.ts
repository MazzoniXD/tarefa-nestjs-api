import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class TasksService {
  private readonly filePath = path.resolve(process.cwd(), 'tasks.json');

  private async readData(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeData(data: any[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll() {
    return await this.readData();
  }

  async findOne(id: string) {
    const tasks = await this.readData();
    const task = tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async create(taskData: any) {
    const tasks = await this.readData();
    const newTask = { id: Date.now().toString(), ...taskData };
    tasks.push(newTask);
    await this.writeData(tasks);
    return newTask;
  }

  async update(id: string, updateData: any) {
    const tasks = await this.readData();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException(`Task with id ${id} not found`);
    
    tasks[index] = { ...tasks[index], ...updateData, id };
    await this.writeData(tasks);
    return tasks[index];
  }

  async patch(id: string, patchData: any) {
    const tasks = await this.readData();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException(`Task with id ${id} not found`);
    
    tasks[index] = { ...tasks[index], ...patchData };
    await this.writeData(tasks);
    return tasks[index];
  }

  async delete(id: string) {
    const tasks = await this.readData();
    const filteredTasks = tasks.filter(t => t.id !== id);
    if (tasks.length === filteredTasks.length) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.writeData(filteredTasks);
    return { message: `Task ${id} deleted successfully` };
  }
}