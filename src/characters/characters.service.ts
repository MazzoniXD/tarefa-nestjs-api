import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class CharactersService {
  private readonly filePath = path.resolve(process.cwd(), 'characters.json');

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
    const characters = await this.readData();
    const character = characters.find(c => c.id === id);
    if (!character) throw new NotFoundException(`Character with id ${id} not found`);
    return character;
  }

  async create(characterData: any) {
    const characters = await this.readData();
    const newCharacter = { id: Date.now().toString(), ...characterData };
    characters.push(newCharacter);
    await this.writeData(characters);
    return newCharacter;
  }

  async update(id: string, updateData: any) {
    const characters = await this.readData();
    const index = characters.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException(`Character with id ${id} not found`);
    
    characters[index] = { ...characters[index], ...updateData, id };
    await this.writeData(characters);
    return characters[index];
  }

  async patch(id: string, patchData: any) {
    const characters = await this.readData();
    const index = characters.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException(`Character with id ${id} not found`);
    
    characters[index] = { ...characters[index], ...patchData };
    await this.writeData(characters);
    return characters[index];
  }

  async delete(id: string) {
    const characters = await this.readData();
    const filteredCharacters = characters.filter(c => c.id !== id);
    if (characters.length === filteredCharacters.length) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    await this.writeData(filteredCharacters);
    return { message: `Character ${id} deleted successfully` };
  }
}