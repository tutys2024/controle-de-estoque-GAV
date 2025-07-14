import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Configuração das credenciais
const CREDENTIALS = {
  "type": "service_account",
  "project_id": "eco-channel-465718-n3",
  "private_key_id": "e5a66fce092b76791e22a1d27f3bfe4d61ce59d3",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDsLNgu5nKWwWQa\nB6HM2kGZ2HHxoaOiBKuRtJenAxaKo4WNKVPgWrOv8t1paeoRh0xIxOYiSJh88Htr\nrKiCKftfDjRt4lUGr+o6BET3JOtOv1i9KzfjzdXpwazGvS0n+nsi8T8eCaknn56k\nQ4rTafWqV7R/zAIRC5nb4sy5ktOVaJ0jPfwAIb7bfA5Hb+g5Z7Auw0G0dr87vRaO\nyzAnNwoNH9qfgsYEPdSkPXn4Tgv3jUGoiW1PD06K1Vt5EglEXUr8CjtemndyBuR4\n7KMZ0XhOEUbIuAEW5s6oHbt8VNWv3ZaeGeWGCptQUHDoyXaHw/gdFlDOzSBKZnja\nNR3Z695zAgMBAAECggEAG7XB7PQfiw3zD2rIfR85MIfItq+0YeoSXJdyblIFGbcd\n5aDCX+xvG2caEKgwomXcJB2WCCe5sc8KwWi8of5dqUV4DqcjkBP2c2AqMfp5m/+v\nYGKVvXtabIF2IstHZQ1qgoBeW3PeuPDCzZsZyrxVP+s9GPwise/z2Wy+1cx4WWsh\nxr5HmQeUJX+6VK0u5dmPHd/TOB3N/+J1uBrUNzXLZ/HozE9v5TmL1cpTfLKrxHK2\npRo+lAqp/6+b6ffO33giLFWVZIXkd7Sn4TLyBNaCibZ95Kn9ijdfco01LXqSF2rs\nhI+huo56EQHjs2cHDFux1N9TuPiw2hGw7dUldB9TIQKBgQD23L2fRVEgYkA0Grby\njSwe6EYGrqqRBCiWgxp3GnWYl13cvS2QX0htBeI6CZCOJv+FJClBCXTu72zSXClN\nsiPmX1Ngh18e6M3FNvwIHX9qqH5QwWrEGX4NO0sANmC3gGvtgZo8ywmiz4MFtPJh\nrcnJfevZpu+w26I7NRL0ISqpjQKBgQD06tVKxkuKo7g9dnim6W6VmZ+Yxv7N1V99\nKebpuQM7SkF03ZNCt7ATbpCQiKizgxkyeAFo7AapqTRj3HafAfz3ni/wY4eTY5ZE\nZSLhqZp5mNgXFUnhRbDhDktCwJznpujOjLZ+cThOD5BQWP4yWOMdbHpN3NTOpa6F\n1wDwMZqn/wKBgDez74W02m14PgyDyqxIdqAywTpYx1wZmB7+TkZ5zfc0kJVyiol9\nNpaDMVzvM5Mf8aBVXIm0XJJdrCx7Z0aE39znvaSWZzxOQ8AwfAZIwauLgZUvT6wY\nJH1P18igfIpri+73w5ncJrx6HpJ3Fgo8cL/qjgF6zbMWnDDH9RLpOPsxAoGAJzHN\noIHLZQx+V5e2B0AkKlzDZbey303eUjF6erzY/4wKnaE4B91NmE6BZB/6n3/DcIgz\n8Y6UImKpt7F4aknvKdFu6pGDCNtPGPL2ehaiWgNT0Z3ejOaSP/IBqVUZxxi2+Rcb\nvXBxCk0DU1hqlbQT5ImPqRZGGCv7mf+mbsoBbhECgYBUdJADdyd8ia8LUdKL7q4X\nwWvtyp3K/Vh+SU/UT8NUx1feFmPexvoZR9g/Rv/LJ7M+uy7cP8gSlBaaWR4/ER8q\nQbDPpD7kvgotRbCx9yrKDzhhcl78mkXTY/2zMXLHlBr7WmACM1vdI2AzlJOhNt5V\nXdjRKKv3fBe+GCIZuM3YUg==\n-----END PRIVATE KEY-----\n",
  "client_email": "estoque@eco-channel-465718-n3.iam.gserviceaccount.com",
  "client_id": "109193494890682968827",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/estoque%40eco-channel-465718-n3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// ID da planilha
const SPREADSHEET_ID = '1sfCZvumhou945u2a--MHqRrx4CPJhaAL';
const SHEET_NAME = 'Estoque 07.2025';

class GoogleSheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Configurar autenticação
      this.auth = new GoogleAuth({
        credentials: CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      // Criar cliente da API do Sheets
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      this.initialized = true;
      
      console.log('Google Sheets API inicializada com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar Google Sheets API:', error);
      throw error;
    }
  }

  async getEstoqueData() {
    await this.initialize();

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A5:J1000`, // Começar da linha 5 para pular cabeçalhos
      });

      const rows = response.data.values || [];
      
      // Processar dados e converter para formato estruturado
      const estoqueData = rows
        .filter(row => row[0] && row[1]) // Filtrar linhas com dados válidos
        .map((row, index) => ({
          id: index + 1,
          subcategoria: row[0] || '',
          descricao: row[1] || '',
          unidade: row[2] || '',
          deposito: parseInt(row[3]) || 0,
          estoqueReal: parseInt(row[4]) || 0,
          mediaDiaria: parseFloat(row[5]) || 0,
          prazoPedido: parseInt(row[6]) || 15,
          diasEstoque: row[7] || '',
          estoqueMinimo: parseFloat(row[8]) || 0,
          status: row[9] || 'OK'
        }));

      return estoqueData;
    } catch (error) {
      console.error('Erro ao buscar dados do estoque:', error);
      throw error;
    }
  }

  async updateEstoqueItem(itemId, updatedData) {
    await this.initialize();

    try {
      // Calcular a linha na planilha (começando da linha 5 + itemId)
      const rowIndex = itemId + 4; // +4 porque começamos da linha 5 (índice 0-based)
      
      const range = `${SHEET_NAME}!A${rowIndex}:J${rowIndex}`;
      
      const values = [[
        updatedData.subcategoria,
        updatedData.descricao,
        updatedData.unidade,
        updatedData.deposito,
        updatedData.estoqueReal,
        updatedData.mediaDiaria,
        updatedData.prazoPedido,
        updatedData.diasEstoque,
        updatedData.estoqueMinimo,
        updatedData.status
      ]];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: { values }
      });

      console.log(`Item ${itemId} atualizado com sucesso`);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar item do estoque:', error);
      throw error;
    }
  }

  async addEstoqueItem(newItem) {
    await this.initialize();

    try {
      // Encontrar a próxima linha vazia
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:A`,
      });

      const rows = response.data.values || [];
      const nextRow = rows.length + 1;

      const range = `${SHEET_NAME}!A${nextRow}:J${nextRow}`;
      
      const values = [[
        newItem.subcategoria,
        newItem.descricao,
        newItem.unidade,
        newItem.deposito,
        newItem.estoqueReal,
        newItem.mediaDiaria,
        newItem.prazoPedido,
        newItem.diasEstoque,
        newItem.estoqueMinimo,
        newItem.status
      ]];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: { values }
      });

      console.log('Novo item adicionado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao adicionar novo item:', error);
      throw error;
    }
  }
}

// Singleton instance
const googleSheetsService = new GoogleSheetsService();

export default googleSheetsService;

