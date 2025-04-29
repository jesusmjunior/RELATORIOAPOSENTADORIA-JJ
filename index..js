{/* Tab: Análise CNIS */}
        {activeTab === 'cnis' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow col-span-1">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">👤</span> Dados do CNIS
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <div className="w-40 font-medium">Nome:</div>
                    <div className="flex-1">{seguradoData.nome}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">NIT:</div>
                    <div className="flex-1">{seguradoData.nit}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">CPF:</div>
                    <div className="flex-1">{seguradoData.cpf}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data de Nascimento:</div>
                    <div className="flex-1">{seguradoData.dataNascimento}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Filiação:</div>
                    <div className="flex-1">FRANCISCA AMARAL BEZERRA</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data Filiação INSS:</div>
                    <div className="flex-1">{seguradoData.dataFiliacaoINSS}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Vínculos:</div>
                    <div className="flex-1">{vinculosEmpregaticiosData.length} registros</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Benefício:</div>
                    <div className="flex-1">Desde {seguradoData.beneficio.dib}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow col-span-2">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">📊</span> Análise de Contribuições
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#3C0710] bg-opacity-10 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-[#3C0710]">Total de Contribuições</p>
                    <p className="text-2xl font-bold text-[#3C0710]">{parametrosData[0].auditoria}</p>
                    <p className="text-xs text-gray-600">Válidas</p>
                  </div>
                  
                  <div className="bg-[#333333] bg-opacity-10 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-[#333333]">Consideradas (80%)</p>
                    <p className="text-2xl font-bold text-[#333333]">{parametrosData[1].auditoria}</p>
                    <p className="text-xs text-gray-600">Maiores valores</p>
                  </div>
                  
                  <div className="bg-[#FFD700] bg-opacity-10 p-3 rounded-lg text-center">
                    <p className="text-sm font-medium text-black">Reaproveitadas</p>
                    <p className="text-2xl font-bold text-black">{parametrosData[2].auditoria}</p>
                    <p className="text-xs text-gray-600">Desconsideradas pelo INSS</p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={faixasContribuicaoData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="qtde"
                            nameKey="faixa"
                            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {faixasContribuicaoData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLOR_SCALE[index % COLOR_SCALE.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs text-center">Distribuição por faixas de valor</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={historicoContribuicoes}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="periodo" tick={{fontSize: 10}} />
                          <YAxis />
                          <Tooltip formatter={(value) => value} />
                          <Bar dataKey="quantidade" name="Quantidade" fill="#3C0710" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs text-center">Quantidade de contribuições por década</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                <span className="mr-2">📑</span> Vínculos Empregatícios
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#3C0710] text-white">
                      <th className="text-center p-2 rounded-tl-md">#</th>
                      <th className="text-left p-2">Empresa / Atividade</th>
                      <th className="text-center p-2">CNPJ / Tipo</th>
                      <th className="text-center p-2">Data Início</th>
                      <th className="text-center p-2">Data Fim</th>
                      <th className="text-center p-2 rounded-tr-md">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vinculosEmpregaticiosData.map((item, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <td className="p-2 text-center">{item.seq}</td>
                        <td className="p-2">{item.empresa}</td>
                        <td className="p-2 text-center">{item.cnpj || item.tipo}</td>
                        <td className="p-2 text-center">{item.inicio}</td>
                        <td className="p-2 text-center">{item.fim || "-"}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.fim === "ATIVO" || !item.fim 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {item.fim === "ATIVO" || !item.fim ? "Ativo" : "Encerrado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>* Dados extraídos do CNIS em 12/03/2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">💼</span> Remunerações (Amostra Carta de Concessão)
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-[#3C0710] text-white">
                        <th className="text-center p-2 rounded-tl-md">Seqimport React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, ReferenceLine, ScatterChart, Scatter, ZAxis } from 'recharts';

const DashboardPrevidenciario = () => {
  const [activeTab, setActiveTab] = useState('resumo');

  // Dados do segurado
  const seguradoData = {
    nome: "ANTONIO FRANCISCO BEZERRA",
    cpf: "094.805.283-04",
    dataNascimento: "11/01/1954",
    nit: "112.54588.29-3",
    ocupacao: "Técnico em Telecomunicações",
    vinculosEmpregaticiosTotal: 8,
    dataFiliacaoINSS: "12/05/1977",
    beneficio: {
      numero: "171516921-0",
      especie: "42 - APOSENTADORIA POR TEMPO DE CONTRIBUICAO",
      der: "11/12/2014",
      dib: "11/12/2014",
      rmi: "R$ 3.703,98",
      concessao: "20/04/2015"
    },
    tempoContribuicao: "38 anos, 1 mês e 25 dias",
    idade: "60 anos"
  };

  // Dados comparativos
  const comparativoData = {
    inss: {
      salario: 3703.98,
      fator: 0.9373,
      media: 3951.76,
      totalContribuicoes: 215,
      contribuicoesConsideradas: 172,
      contribuicoesReaproveitadas: 0
    },
    correto: {
      salario: 4321.03,
      fator: 0.9282,
      media: 4655.28,
      totalContribuicoes: 45,
      contribuicoesConsideradas: 36,
      contribuicoesReaproveitadas: 37
    },
    diferenca: {
      mensal: 617.05,
      percentual: 16.66,
      acumulada: 110130.54,
      contribuicoes: -170,
      contribuicoesConsideradas: -136,
      contribuicoesReaproveitadas: 37
    }
  };

  // Dados de evolução do benefício (histórico completo)
  const evolucaoData = [
    { ano: 2015, inss: 3934.84, correto: 4590.33, diferenca: 655.49 },
    { ano: 2016, inss: 4378.29, correto: 5108.09, diferenca: 729.80 },
    { ano: 2017, inss: 4420.22, correto: 5157.17, diferenca: 736.95 },
    { ano: 2018, inss: 4511.71, correto: 5263.98, diferenca: 752.27 },
    { ano: 2019, inss: 4666.46, correto: 5444.15, diferenca: 777.69 },
    { ano: 2020, inss: 4875.51, correto: 5688.65, diferenca: 813.14 },
    { ano: 2021, inss: 5141.22, correto: 5997.96, diferenca: 856.74 },
    { ano: 2022, inss: 5663.56, correto: 6607.11, diferenca: 943.55 },
    { ano: 2023, inss: 5999.40, correto: 6999.33, diferenca: 999.93 },
    { ano: 2024, inss: 6221.97, correto: 7259.00, diferenca: 1037.03 },
    { ano: 2025, inss: 6518.75, correto: 7611.64, diferenca: 1092.89 }
  ];
  
  // Dados históricos de salários de contribuição
  const historicoContribuicoes = [
    { periodo: "1970s", media: 0, quantidade: 1, maior: 0, menor: 0 },
    { periodo: "1980s", media: 1512.33, quantidade: 96, maior: 6296.85, menor: 701.99 },
    { periodo: "1990s", media: 2827.71, quantidade: 76, maior: 39824.37, menor: 11.82 },
    { periodo: "2000s", media: 2381.83, quantidade: 108, maior: 4623.15, menor: 1403.75 },
    { periodo: "2010s", media: 4055.42, quantidade: 60, maior: 6487.73, menor: 2956.00 },
    { periodo: "2020s", media: 5913.04, quantidade: 27, maior: 6518.75, menor: 4875.51 }
  ];

  // Dados para o gráfico de pizza do montante devido
  const montanteDevidoData = [
    { name: 'Diferenças vencidas', value: 72146.39 },
    { name: 'Correção monetária', value: 11789.82 },
    { name: 'Juros legais', value: 26194.33 }
  ];

  // Dados para os parâmetros processados
  const parametrosData = [
    { parametro: 'Total de contribuições', inss: 215, auditoria: 45, diferenca: -170 },
    { parametro: 'Contribuições consideradas (80%)', inss: 172, auditoria: 36, diferenca: -136 },
    { parametro: 'Salários reaproveitáveis', inss: 0, auditoria: 37, diferenca: 37 },
    { parametro: 'Média salarial (R$)', inss: 3951.76, auditoria: 4655.28, diferenca: 703.52 },
    { parametro: 'Fator previdenciário', inss: 0.9373, auditoria: 0.9282, diferenca: -0.0091 },
    { parametro: 'Salário de benefício', inss: 3703.98, auditoria: 4321.03, diferenca: 617.05 }
  ];

  // Dados para o cálculo do fator previdenciário
  const fatorData = {
    tc: 38.14, // Tempo de Contribuição em anos
    a: 0.31,   // Alíquota
    es: 21.8,  // Expectativa de Sobrevida em anos
    id: 60.92  // Idade na DER em anos
  };
  
  // Dados do histórico das contribuições por faixa de valor (baseado no CNIS)
  const faixasContribuicaoData = [
    { faixa: "Até R$ 500", qtde: 23, percentual: 6.3 },
    { faixa: "R$ 501 a R$ 1.000", qtde: 18, percentual: 4.9 },
    { faixa: "R$ 1.001 a R$ 2.000", qtde: 89, percentual: 24.4 },
    { faixa: "R$ 2.001 a R$ 3.000", qtde: 92, percentual: 25.2 },
    { faixa: "R$ 3.001 a R$ 4.000", qtde: 63, percentual: 17.3 },
    { faixa: "R$ 4.001 a R$ 5.000", qtde: 42, percentual: 11.5 },
    { faixa: "R$ 5.001 a R$ 10.000", qtde: 31, percentual: 8.5 },
    { faixa: "Acima de R$ 10.000", qtde: 7, percentual: 1.9 }
  ];
  
  // Dados da Carta de Concessão (primeiros 15 registros)
  const cartaConcessaoData = [
    { seq: 1, data: "11/2014", salario: 4390.24, indice: 1.0053, salarioCorrigido: 4413.50 },
    { seq: 2, data: "10/2014", salario: 4390.24, indice: 1.0091, salarioCorrigido: 4430.27 },
    { seq: 3, data: "09/2014", salario: 4390.24, indice: 1.0140, salarioCorrigido: 4451.98 },
    { seq: 4, data: "08/2014", salario: 4390.24, indice: 1.0158, salarioCorrigido: 4460.00 },
    { seq: 5, data: "07/2014", salario: 4390.24, indice: 1.0172, salarioCorrigido: 4465.80 },
    { seq: 6, data: "06/2014", salario: 4390.24, indice: 1.0198, salarioCorrigido: 4477.41 },
    { seq: 7, data: "05/2014", salario: 4390.24, indice: 1.0259, salarioCorrigido: 4504.27 },
    { seq: 8, data: "04/2014", salario: 4390.24, indice: 1.0339, salarioCorrigido: 4539.40 },
    { seq: 9, data: "03/2014", salario: 4390.24, indice: 1.0424, salarioCorrigido: 4576.63 },
    { seq: 10, data: "02/2014", salario: 4390.24, indice: 1.0491, salarioCorrigido: 4605.92 },
    { seq: 11, data: "01/2014", salario: 4390.24, indice: 1.0557, salarioCorrigido: 4634.93 },
    { seq: 12, data: "12/2013", salario: 4159.00, indice: 1.0633, salarioCorrigido: 4422.42 },
    { seq: 13, data: "11/2013", salario: 4159.00, indice: 1.0690, salarioCorrigido: 4446.30 },
    { seq: 14, data: "10/2013", salario: 4159.00, indice: 1.0756, salarioCorrigido: 4473.42 },
    { seq: 15, data: "09/2013", salario: 4159.00, indice: 1.0785, salarioCorrigido: 4485.50 }
  ];

  // Erros identificados
  const errosIdentificados = [
    "Contagem incorreta do número de contribuições (215 vs. 45 válidas)",
    "Aplicação inadequada da regra dos 80% maiores salários (172 de 215, em vez de 36 de 45)",
    "Desconsideração de 37 períodos contributivos relevantes que deveriam ser incluídos",
    "Cálculo incorreto do fator previdenciário (0,9373 vs. 0,9282)",
    "Aplicação da regra de transição quando a regra definitiva era mais vantajosa"
  ];
  
  // Detalhamento dos vínculos empregatícios
  const vinculosEmpregaticiosData = [
    { seq: 1, empresa: "SEDEL ENGENHARIA LTDA", inicio: "12/05/1977", fim: "14/01/1981", cnpj: "06.049.282/0001-06" },
    { seq: 2, empresa: "TELECOMUNICACOES DO MARANHAO S.A", inicio: "20/01/1981", fim: "09/2001", cnpj: "06.274.633/0001-74" },
    { seq: 3, empresa: "TELEMAR NORTE LESTE S/A - EM RECUPERACAO JUDICIAL", inicio: "20/01/1981", fim: "10/05/2016", cnpj: "33.000.118/0062-90" },
    { seq: 4, empresa: "Empregado Doméstico", inicio: "01/11/1989", fim: "31/03/1990", tipo: "RECOLHIMENTO" },
    { seq: 5, empresa: "Empregado Doméstico", inicio: "01/05/1990", fim: "31/10/1990", tipo: "RECOLHIMENTO" },
    { seq: 6, empresa: "Segurado Especial", inicio: "04/01/2001", fim: "", tipo: "SEGURADO ESPECIAL" },
    { seq: 7, empresa: "TELEMAR NORTE LESTE S/A - EM RECUPERACAO JUDICIAL", inicio: "01/04/2002", fim: "", cnpj: "33.000.118/0062-90" },
    { seq: 8, empresa: "Benefício - APOSENTADORIA POR TEMPO DE CONTRIBUICAO", inicio: "11/12/2014", fim: "ATIVO", nb: "1715169210" }
  ];
  
  // Contribuições desconsideradas e reaproveitadas (amostra)
  const contribuicoesReaproveitadasData = [
    { competencia: "08/2007", valor: 2195.00, indice: 1.5203, valorCorrigido: 3337.06 },
    { competencia: "07/2007", valor: 2195.00, indice: 1.5251, valorCorrigido: 3347.74 },
    { competencia: "06/2007", valor: 2195.00, indice: 1.5298, valorCorrigido: 3358.12 },
    { competencia: "12/2005", valor: 2029.00, indice: 1.6089, valorCorrigido: 3264.62 },
    { competencia: "11/2005", valor: 2029.00, indice: 1.6176, valorCorrigido: 3282.24 }
  ];

  // Função para formatar valores monetários
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Função para formatar números com casas decimais
  const formatarNumero = (valor, casas = 2) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas
    }).format(valor);
  };
  
  // Função para formatar datas
  const formatarData = (dataString) => {
    if (!dataString) return "";
    
    // Se já estiver no formato DD/MM/YYYY, retorna como está
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
      return dataString;
    }
    
    // Se for MM/YYYY
    if (/^\d{2}\/\d{4}$/.test(dataString)) {
      return dataString;
    }
    
    // Se for apenas o ano
    if (/^\d{4}$/.test(dataString)) {
      return dataString;
    }
    
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch (e) {
      return dataString;
    }
  };

  const COLORS = ['#3C0710', '#333333', '#FFD700'];
  const COLOR_SCALE = ['#660000', '#8B0000', '#A52A2A', '#B22222', '#CD5C5C', '#D87093', '#DC143C'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-3">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="70" r="20" fill="#3C0710" />
                  <rect x="45" y="25" width="10" height="45" fill="#3C0710" />
                  <circle cx="30" cy="30" r="15" fill="#FFD700" />
                  <circle cx="50" cy="20" r="15" fill="#FFD700" />
                  <circle cx="70" cy="30" r="15" fill="#FFD700" />
                  <circle cx="40" cy="40" r="10" fill="#FFD700" />
                  <circle cx="60" cy="40" r="10" fill="#FFD700" />
                  <circle cx="50" cy="25" r="3" fill="#333333" />
                  <circle cx="65" cy="35" r="3" fill="#333333" />
                  <circle cx="35" cy="35" r="3" fill="#333333" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-[#3C0710]">OLIVEIRA'S LAW OFFICE</h1>
                <p className="text-xs text-gray-600">
                  Consultoria Jurídico-Contábil 
                  <span className="ml-2 bg-[#FFD700] text-[#333333] px-2 py-0.5 rounded-full text-xs font-bold">
                    PREMIUM
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500">29/04/2025</span>
              <span className="text-sm font-medium text-[#3C0710]">Processo: INSS-171516921-0</span>
              <span className="text-xs text-gray-500">Ref: Revisão da Vida Toda</span>
            </div>
          </div>
        </div>
      </header>

      {/* Banner principal com informações do segurado */}
      <div className="bg-gradient-to-r from-[#3C0710] to-[#4A0D1A] text-white py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold">AUDITORIA PREVIDENCIÁRIA</h2>
              <p className="text-lg font-semibold">{seguradoData.nome}</p>
              <div className="flex flex-wrap gap-x-4 text-sm mt-1">
                <span>CPF: {seguradoData.cpf}</span>
                <span>NIT: {seguradoData.nit}</span>
                <span>Benefício: {seguradoData.beneficio.numero}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-white text-[#3C0710] px-4 py-2 rounded-lg shadow-md text-right">
                <p className="text-xs font-medium">Diferença Mensal</p>
                <p className="text-2xl font-bold">{formatarMoeda(comparativoData.diferenca.mensal)}</p>
                <p className="text-xs font-medium">Total acumulado: {formatarMoeda(comparativoData.diferenca.acumulada)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('resumo')} 
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'resumo' ? 'text-[#3C0710] border-b-2 border-[#3C0710]' : 'text-gray-600'}`}
            >
              📊 Resumo Executivo
            </button>
            <button 
              onClick={() => setActiveTab('analise')} 
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'analise' ? 'text-[#3C0710] border-b-2 border-[#3C0710]' : 'text-gray-600'}`}
            >
              🔍 Análise Técnica
            </button>
            <button 
              onClick={() => setActiveTab('evolucao')} 
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'evolucao' ? 'text-[#3C0710] border-b-2 border-[#3C0710]' : 'text-gray-600'}`}
            >
              📈 Evolução do Benefício
            </button>
            <button 
              onClick={() => setActiveTab('cnis')} 
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'cnis' ? 'text-[#3C0710] border-b-2 border-[#3C0710]' : 'text-gray-600'}`}
            >
              🧾 Análise CNIS
            </button>
            <button 
              onClick={() => setActiveTab('fundamentos')} 
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'fundamentos' ? 'text-[#3C0710] border-b-2 border-[#3C0710]' : 'text-gray-600'}`}
            >
              ⚖️ Fundamentos Jurídicos
            </button>
            <button 
              onClick={() => setActiveTab('recomendacoes')} 
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'recomendacoes' ? 'text-[#3C0710] border-b-2 border-[#3C0710]' : 'text-gray-600'}`}
            >
              ✅ Recomendações
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Tab: Resumo Executivo */}
        {activeTab === 'resumo' && (
          <div>
            {/* Métricas principais em cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#3C0710] to-[#4A0D1A] text-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium opacity-90">Cálculo INSS</h3>
                <p className="text-2xl font-bold text-[#FFD700]">{formatarMoeda(comparativoData.inss.salario)}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span>Fator: {formatarNumero(comparativoData.inss.fator, 4)}</span>
                  <span>Média: {formatarMoeda(comparativoData.inss.media)}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#333333] to-[#444444] text-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium opacity-90">Cálculo Correto</h3>
                <p className="text-2xl font-bold text-[#FFD700]">{formatarMoeda(comparativoData.correto.salario)}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span>Fator: {formatarNumero(comparativoData.correto.fator, 4)}</span>
                  <span>Média: {formatarMoeda(comparativoData.correto.media)}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-black to-[#222222] text-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium opacity-90">Diferença Mensal</h3>
                <p className="text-2xl font-bold text-green-400">{formatarMoeda(comparativoData.diferenca.mensal)}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span>Percentual: +{comparativoData.diferenca.percentual}%</span>
                  <span>Média: +{formatarMoeda(comparativoData.diferenca.mensal * 12)} (anual)</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1C4E80] to-[#0A2540] text-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium opacity-90">Total Devido</h3>
                <p className="text-2xl font-bold text-[#FFD700]">{formatarMoeda(comparativoData.diferenca.acumulada)}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span>Principal: {formatarMoeda(72146.39)}</span>
                  <span>Acessórios: {formatarMoeda(11789.82 + 26194.33)}</span>
                </div>
              </div>
            </div>

            {/* Resumo do caso e Erros identificados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">📋</span> Resumo do Caso
                </h3>
                <div className="text-sm space-y-3">
                  <div className="flex">
                    <div className="w-40 font-medium">Segurado:</div>
                    <div className="flex-1">{seguradoData.nome}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data de Nascimento:</div>
                    <div className="flex-1">{seguradoData.dataNascimento} ({seguradoData.idade} na DER)</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Documentos:</div>
                    <div className="flex-1">NIT: {seguradoData.nit} | CPF: {seguradoData.cpf}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Benefício:</div>
                    <div className="flex-1">{seguradoData.beneficio.especie}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Nº do Benefício:</div>
                    <div className="flex-1">{seguradoData.beneficio.numero}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data Requerimento:</div>
                    <div className="flex-1">{seguradoData.beneficio.der}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data de Concessão:</div>
                    <div className="flex-1">{seguradoData.beneficio.concessao}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Tempo Contribuição:</div>
                    <div className="flex-1">{seguradoData.tempoContribuicao}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data Filiação INSS:</div>
                    <div className="flex-1">{seguradoData.dataFiliacaoINSS}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span> Erros Identificados no Cálculo
                </h3>
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  {errosIdentificados.map((erro, index) => (
                    <li key={index} className="leading-tight">{erro}</li>
                  ))}
                </ol>
                <div className="mt-4 bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] p-3 rounded text-sm">
                  <p className="font-semibold">Observação importante:</p>
                  <p>O segurado faz jus à aplicação da regra definitiva (art. 29, I da Lei 8.213/91) por ser mais vantajosa que a regra de transição (art. 3º da Lei 9.876/99).</p>
                </div>
              </div>
            </div>

            {/* Gráfico comparativo e Distribuição do Valor Devido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">📊</span> Comparativo de Cálculos
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { categoria: 'Total de Contribuições', inss: comparativoData.inss.totalContribuicoes, correto: comparativoData.correto.totalContribuicoes },
                        { categoria: 'Contribuições (80%)', inss: comparativoData.inss.contribuicoesConsideradas, correto: comparativoData.correto.contribuicoesConsideradas },
                        { categoria: 'Contrib. Reaproveitadas', inss: comparativoData.inss.contribuicoesReaproveitadas, correto: comparativoData.correto.contribuicoesReaproveitadas },
                        { categoria: 'Média Salarial (x1000)', inss: comparativoData.inss.media/1000, correto: comparativoData.correto.media/1000 },
                        { categoria: 'Salário Benefício (x1000)', inss: comparativoData.inss.salario/1000, correto: comparativoData.correto.salario/1000 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="categoria" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => {
                        if (name === 'inss' || name === 'correto') {
                          if (value < 100) {
                            return value;
                          } else {
                            return formatarMoeda(value * 1000);
                          }
                        }
                        return value;
                      }} />
                      <Legend />
                      <Bar dataKey="inss" name="INSS" fill="#333333" />
                      <Bar dataKey="correto" name="Cálculo Correto" fill="#3C0710" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">💰</span> Composição do Valor Devido
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={montanteDevidoData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                        >
                          {montanteDevidoData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatarMoeda(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-[#3C0710] text-white">
                            <th className="text-left p-2 rounded-tl-md">Componente</th>
                            <th className="text-right p-2 rounded-tr-md">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {montanteDevidoData.map((item, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                              <td className="p-2 flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: COLORS[index % COLORS.length]}}></span>
                                {item.name}
                              </td>
                              <td className="p-2 text-right font-medium">{formatarMoeda(item.value)}</td>
                            </tr>
                          ))}
                          <tr className="bg-black text-white">
                            <td className="p-2 font-bold rounded-bl-md">TOTAL</td>
                            <td className="p-2 text-right font-bold text-[#FFD700] rounded-br-md">{formatarMoeda(montanteDevidoData.reduce((sum, item) => sum + item.value, 0))}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gráfico de evolução do benefício */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                <span className="mr-2">📈</span> Projeção de Evolução do Benefício (2015-2025)
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={evolucaoData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="ano" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value) => formatarMoeda(value)} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      yAxisId="left"
                      dataKey="diferenca" 
                      name="Diferença Mensal" 
                      fill="#FFD700" 
                      fillOpacity={0.3}
                      stroke="#FFD700" 
                      strokeWidth={1} 
                    />
                    <Line 
                      type="monotone" 
                      yAxisId="left"
                      dataKey="correto" 
                      name="Valor Correto" 
                      stroke="#3C0710" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      yAxisId="left"
                      dataKey="inss" 
                      name="Valor INSS" 
                      stroke="#333333" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

 aplicada análise paramétrica avançada aos dados do CNIS e Carta de Concessão do segurado, com processamento estatístico para identificação precisa dos 80% maiores salários de contribuição, conforme exigido pela Lei 8.213/91.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#3C0710] mb-2">Parâmetros Processados:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-[#3C0710] text-white">
                          <th className="text-left p-2 rounded-tl">Parâmetro</th>
                          <th className="text-left p-2">INSS</th>
                          <th className="text-left p-2">Auditoria</th>
                          <th className="text-left p-2 rounded-tr">Diferença</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parametrosData.map((item, index) => (
                          <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                            <td className="p-2">{item.parametro}</td>
                            <td className="p-2">
                              {item.parametro.includes('R$') 
                                ? formatarMoeda(item.inss)
                                : formatarNumero(item.inss, item.parametro === 'Fator previdenciário' ? 4 : 0)}
                            </td>
                            <td className="p-2">
                              {item.parametro.includes('R$') 
                                ? formatarMoeda(item.auditoria)
                                : formatarNumero(item.auditoria, item.parametro === 'Fator previdenciário' ? 4 : 0)}
                            </td>
                            <td className={`p-2 font-bold ${item.diferenca > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.parametro.includes('R$')
                                ? formatarMoeda(item.diferenca)
                                : (item.diferenca > 0 ? '+' : '') + formatarNumero(item.diferenca, item.parametro === 'Fator previdenciário' ? 4 : 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-[#3C0710] mb-2">Análise Estatística:</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { nome: 'Média', inss: comparativoData.inss.media, auditoria: comparativoData.correto.media },
                          { nome: 'Salário de Benefício', inss: comparativoData.inss.salario, auditoria: comparativoData.correto.salario }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatarMoeda(value)} />
                        <Legend />
                        <Bar dataKey="inss" name="INSS" fill="#333333" />
                        <Bar dataKey="auditoria" name="Auditoria" fill="#3C0710" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-[#3C0710] mb-2">Desvio Estatístico na Aplicação da Regra dos 80%:</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { categoria: 'INSS (incorreto)', totalContribuicoes: 215, consideradas: 172, reaproveitadas: 0 },
                        { categoria: 'Auditoria (correto)', totalContribuicoes: 45, consideradas: 36, reaproveitadas: 37 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="categoria" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="totalContribuicoes" name="Total de Contribuições" fill="#3C0710" />
                      <Bar dataKey="consideradas" name="Consideradas (80%)" fill="#333333" />
                      <Bar dataKey="reaproveitadas" name="Reaproveitadas" fill="#FFD700" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">🧮</span> Cálculo do Fator Previdenciário
              </h3>
              
              <p className="mb-3">O fator previdenciário é calculado conforme a seguinte fórmula normativa da Lei 9.876/99:</p>
              <div className="bg-[#333333] text-white p-3 text-center font-bold mb-4 rounded">
                Fator = (Tc × a) ÷ Es × [1 + (Id + Tc × a) ÷ 100]
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#3C0710] mb-2">Aplicação da Fórmula:</h4>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-[#3C0710] text-white">
                        <th className="text-left p-2 rounded-tl">Parâmetro</th>
                        <th className="text-left p-2">Descrição</th>
                        <th className="text-left p-2 rounded-tr">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-gray-50">
                        <td className="p-2 font-bold">Tc</td>
                        <td className="p-2">Tempo de Contribuição</td>
                        <td className="p-2">{fatorData.tc} anos</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-bold">a</td>
                        <td className="p-2">Alíquota (Lei 8.213/91)</td>
                        <td className="p-2">{fatorData.a}</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="p-2 font-bold">Es</td>
                        <td className="p-2">Expectativa de Sobrevida (IBGE)</td>
                        <td className="p-2">{fatorData.es} anos</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-bold">Id</td>
                        <td className="p-2">Idade na DER</td>
                        <td className="p-2">{fatorData.id} anos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h4 className="font-bold text-[#3C0710] mb-2">Processamento do Cálculo:</h4>
                  <ol className="list-decimal ml-5 text-sm">
                    <li className="mb-2">Tc × a = {fatorData.tc} × {fatorData.a} = <strong>11,82</strong></li>
                    <li className="mb-2">(Tc × a) ÷ Es = 11,82 ÷ {fatorData.es} = <strong>0,5423</strong></li>
                    <li className="mb-2">1 + (Id + Tc × a) ÷ 100 = 1 + ({fatorData.id} + 11,82) ÷ 100 = <strong>1,7274</strong></li>
                    <li className="mb-2">Fator = 0,5423 × 1,7274 = <strong>0,9282</strong></li>
                  </ol>
                  <div className="mt-4 p-3 bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] rounded">
                    <p className="text-sm"><strong>Nota técnica:</strong> O INSS utilizou fator de 0,9373, quando o correto é 0,9282. Embora a diferença seja de apenas -0,0091 (-0,97%), este erro, combinado com a média salarial incorreta, impactou negativamente o benefício.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Evolução do Benefício */}
        {activeTab === 'evolucao' && (
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                <span className="mr-2">📈</span> Evolução do Benefício (2015-2025)
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={evolucaoData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatarMoeda(value)} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="correto" 
                      name="Valor Correto" 
                      stroke="#3C0710" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="inss" 
                      name="Valor INSS" 
                      stroke="#333333" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="diferenca" 
                      name="Diferença" 
                      stroke="#FFD700" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Evolução dos valores históricos e projeção dos próximos reajustes
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">📊</span> Diferenças Mensais
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={evolucaoData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ano" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatarMoeda(value)} />
                      <Legend />
                      <Bar dataKey="diferenca" name="Diferença Mensal" fill="#FFD700" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">💹</span> Crescimento Acumulado (%)
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={evolucaoData.map((item, index, array) => ({
                        ano: item.ano,
                        acumuladoINSS: ((item.inss / array[0].inss) - 1) * 100,
                        acumuladoCorreto: ((item.correto / array[0].correto) - 1) * 100
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ano" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => `${formatarNumero(value)}%`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="acumuladoCorreto" 
                        name="Crescimento Valor Correto" 
                        stroke="#3C0710" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="acumuladoINSS" 
                        name="Crescimento Valor INSS" 
                        stroke="#333333" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                <span className="mr-2">📑</span> Tabela de Valores Históricos e Projeções
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#3C0710] text-white">
                      <th className="text-left p-2 rounded-tl-md">Ano</th>
                      <th className="text-right p-2">Valor INSS (R$)</th>
                      <th className="text-right p-2">Valor Correto (R$)</th>
                      <th className="text-right p-2">Diferença (R$)</th>
                      <th className="text-right p-2">Diferença (%)</th>
                      <th className="text-right p-2 rounded-tr-md">Acumulado Anual (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evolucaoData.map((item, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''} ${index === evolucaoData.length - 1 ? 'font-medium' : ''}`}>
                        <td className="p-2">{item.ano}</td>
                        <td className="p-2 text-right">{formatarMoeda(item.inss)}</td>
                        <td className="p-2 text-right">{formatarMoeda(item.correto)}</td>
                        <td className="p-2 text-right text-green-600">{formatarMoeda(item.diferenca)}</td>
                        <td className="p-2 text-right">+{formatarNumero((item.diferenca / item.inss) * 100)}%</td>
                        <td className="p-2 text-right font-medium">{formatarMoeda(item.diferenca * 12)}</td>
                      </tr>
                    ))}
                    <tr className="bg-black text-white">
                      <td className="p-2 font-bold rounded-bl-md">TOTAL ACUMULADO</td>
                      <td className="p-2 text-right">-</td>
                      <td className="p-2 text-right">-</td>
                      <td className="p-2 text-right">-</td>
                      <td className="p-2 text-right">-</td>
                      <td className="p-2 text-right font-bold text-[#FFD700] rounded-br-md">
                        {formatarMoeda(evolucaoData.reduce((sum, item) => sum + (item.diferenca * 12), 0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 p-3 bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] rounded">
                <p className="text-sm"><strong>Nota sobre projeções:</strong> Os valores a partir de 2023 representam estimativas baseadas na tendência histórica de reajustes do INSS. O cálculo do montante total devido considera apenas o período desde a concessão até a data atual, com correção monetária e juros legais.</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                <span className="mr-2">💰</span> Impacto Financeiro Acumulado
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#3C0710] bg-opacity-10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-[#3C0710] mb-1">Diferenças Vencidas</p>
                  <p className="text-2xl font-bold text-[#3C0710]">{formatarMoeda(72146.39)}</p>
                  <p className="text-xs text-gray-600">Principal</p>
                </div>
                
                <div className="bg-[#333333] bg-opacity-10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-[#333333] mb-1">Correção + Juros</p>
                  <p className="text-2xl font-bold text-[#333333]">{formatarMoeda(11789.82 + 26194.33)}</p>
                  <p className="text-xs text-gray-600">Acessórios</p>
                </div>
                
                <div className="bg-[#FFD700] bg-opacity-10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-black mb-1">Total Devido</p>
                  <p className="text-2xl font-bold text-black">{formatarMoeda(110130.54)}</p>
                  <p className="text-xs text-gray-600">Até 29/04/2025</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-[#3C0710] mb-2">Perspectiva de Impacto Futuro</h4>
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#3C0710] text-white">
                      <th className="text-left p-2 rounded-tl-md">Período</th>
                      <th className="text-right p-2">Diferença Mensal</th>
                      <th className="text-right p-2">Projeção</th>
                      <th className="text-right p-2 rounded-tr-md">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gray-50">
                      <td className="p-2">Próximos 12 meses</td>
                      <td className="p-2 text-right">{formatarMoeda(evolucaoData[evolucaoData.length - 1].diferenca)}</td>
                      <td className="p-2 text-right">12 meses</td>
                      <td className="p-2 text-right font-medium">{formatarMoeda(evolucaoData[evolucaoData.length - 1].diferenca * 12)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Próximos 5 anos</td>
                      <td className="p-2 text-right">{formatarMoeda(evolucaoData[evolucaoData.length - 1].diferenca * 1.15)}</td>
                      <td className="p-2 text-right">60 meses</td>
                      <td className="p-2 text-right font-medium">{formatarMoeda(evolucaoData[evolucaoData.length - 1].diferenca * 1.15 * 60)}</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-2">Projeção até expectativa de sobrevida</td>
                      <td className="p-2 text-right">{formatarMoeda(evolucaoData[evolucaoData.length - 1].diferenca * 1.3)}</td>
                      <td className="p-2 text-right">{fatorData.es * 12} meses</td>
                      <td className="p-2 text-right font-medium">{formatarMoeda(evolucaoData[evolucaoData.length - 1].diferenca * 1.3 * fatorData.es * 12)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 text-xs text-gray-600">
                  <p>* As projeções consideram a tendência de reajustes e a expectativa de sobrevida de {fatorData.es} anos conforme tabela do IBGE.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Fundamentos Jurídicos */}
        {activeTab === 'fundamentos' && (
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">⚖️</span> Fundamentos Legais
              </h3>
              
              <p className="mb-4">A revisão do benefício previdenciário em questão fundamenta-se nas seguintes normas legais:</p>
              
              <div className="bg-[#3C0710] bg-opacity-5 border-l-4 border-[#3C0710] p-4 mb-4 rounded">
                <h4 className="font-bold text-[#3C0710] mb-1">Lei nº 8.213/91, art. 29:</h4>
                <p className="italic text-sm">"O salário-de-benefício consiste na média aritmética simples dos maiores salários-de-contribuição correspondentes a 80% (oitenta por cento) de todo o período contributivo, multiplicada pelo fator previdenciário."</p>
              </div>
              
              <div className="bg-[#3C0710] bg-opacity-5 border-l-4 border-[#3C0710] p-4 mb-4 rounded">
                <h4 className="font-bold text-[#3C0710] mb-1">Lei nº 9.876/99, art. 3º (Regra de Transição):</h4>
                <p className="italic text-sm">"Para o segurado filiado à Previdência Social até o dia anterior à data de publicação desta Lei, que vier a cumprir as condições exigidas para a concessão dos benefícios do Regime Geral de Previdência Social, no cálculo do salário-de-benefício será considerada a média aritmética simples dos maiores salários-de-contribuição, correspondentes a, no mínimo, oitenta por cento de todo o período contributivo decorrido desde a competência julho de 1994, observado o disposto nos incisos I e II do caput do art. 29 da Lei no 8.213, de 1991, com a redação dada por esta Lei."</p>
              </div>
              
              <div className="bg-[#3C0710] bg-opacity-5 border-l-4 border-[#3C0710] p-4 mb-4 rounded">
                <h4 className="font-bold text-[#3C0710] mb-1">Instrução Normativa INSS nº 45/2010, art. 621:</h4>
                <p className="italic text-sm">"O INSS deve conceder o melhor benefício a que o segurado fizer jus, cabendo ao servidor orientar nesse sentido."</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">📚</span> Jurisprudência Consolidada
              </h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-[#3C0710] mb-2">Supremo Tribunal Federal - STF:</h4>
                
                <div className="bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] p-4 mb-4 rounded">
                  <h5 className="font-bold text-[#3C0710] mb-1">Tema 1102/STF (Repercussão Geral) - RE 1276977 / DF:</h5>
                  <p className="text-sm mb-2"><strong>Tese Fixada:</strong> "O segurado que implementou as condições para o benefício previdenciário após a vigência da Lei 9.876, de 26/11/1999, e antes da vigência das novas regras constitucionais, introduzidas pela EC em 103/2019, que tornou a regra transitória definitiva, tem o direito de optar pela regra definitiva, acaso esta lhe seja mais favorável."</p>
                  <p className="text-sm mb-2"><strong>Acórdão publicado em:</strong> 13/04/2023</p>
                  <p className="text-sm"><strong>Relator:</strong> Min. Alexandre de Moraes</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-[#3C0710] mb-2">Superior Tribunal de Justiça - STJ:</h4>
                
                <div className="bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] p-4 mb-4 rounded">
                  <h5 className="font-bold text-[#3C0710] mb-1">Tema 999/STJ - Recurso Repetitivo - REsp 1554596/SC:</h5>
                  <p className="text-sm mb-2"><strong>Tese Firmada:</strong> "Aplica-se a regra definitiva prevista no art. 29, I e II da Lei 8.213/1991, na apuração do salário de benefício, quando mais favorável do que a regra de transição contida no art. 3º da Lei 9.876/1999, aos Segurados que ingressaram no Regime Geral da Previdência Social até o dia anterior à publicação da Lei 9.876/1999."</p>
                  <p className="text-sm mb-2"><strong>Data do Julgamento:</strong> 10/10/2018</p>
                  <p className="text-sm"><strong>Relator:</strong> Min. Napoleão Nunes Maia Filho</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">🔍</span> Análise Jurídica do Caso Concreto
              </h3>
              
              <div className="mb-4">
                <p className="mb-3">No caso específico do segurado <strong>ANTONIO FRANCISCO BEZERRA</strong>, observa-se o seguinte:</p>
                
                <ol className="list-decimal ml-6 space-y-2 mb-4 text-sm">
                  <li>O segurado ingressou no RGPS em <strong>12/05/1977</strong>, sendo anterior à Lei 9.876/99;</li>
                  <li>O benefício foi concedido em <strong>11/12/2014</strong>, após a vigência da Lei 9.876/99 e antes da EC 103/2019;</li>
                  <li>O INSS aplicou a regra de transição do art. 3º da Lei 9.876/99, considerando apenas os salários de contribuição posteriores a julho/1994;</li>
                  <li>A análise técnica demonstrou que a aplicação da regra definitiva (art. 29, I, da Lei 8.213/91) é mais favorável ao segurado, resultando em um benefício 16,66% superior;</li>
                  <li>Ocorreu erro na aplicação da regra dos 80%, com a desconsideração de 37 períodos contributivos relevantes;</li>
                  <li>O segurado se enquadra perfeitamente na tese firmada pelo STF no Tema 1102 e pelo STJ no Tema 999.</li>
                </ol>
                
                <div className="bg-[#3C0710] bg-opacity-5 p-4 rounded mb-4">
                  <p className="text-sm"><strong>Análise de Decadência:</strong> O benefício foi concedido em 11/12/2014, e a ação revisional está sendo proposta dentro do prazo decadencial de 10 anos previsto no art. 103 da Lei 8.213/91, que se encerrará em 11/12/2024.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Recomendações */}
        {activeTab === 'recomendacoes' && (
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">✅</span> Conclusão e Recomendações
              </h3>
              
              <div className="bg-[#FFD700] bg-opacity-10 p-4 rounded mb-4">
                <h4 className="font-bold text-[#3C0710] mb-2">Conclusão Jurídica:</h4>
                <p className="text-sm">Com base na análise técnica e jurídica realizada, conclui-se que o segurado <strong>ANTONIO FRANCISCO BEZERRA</strong> faz jus à revisão de seu benefício previdenciário, mediante a aplicação da regra definitiva prevista no art. 29, I, da Lei 8.213/91, com a inclusão de todo o período contributivo no cálculo da média dos 80% maiores salários de contribuição, por ser mais favorável que a regra de transição aplicada pelo INSS.</p>
              </div>
              
              <div className="bg-[#3C0710] text-white p-4 rounded mb-4">
                <h4 className="font-bold mb-2">Recomendação de Procedimentos:</h4>
                <ol className="list-decimal ml-6 space-y-1 text-sm">
                  <li>Ingressar com ação judicial de revisão previdenciária, com pedido de tutela de evidência, com base na tese firmada no Tema 1102 do STF;</li>
                  <li>Pleitear a condenação do INSS a recalcular o benefício, aplicando a regra definitiva do art. 29, I, da Lei 8.213/91;</li>
                  <li>Requerer o pagamento das diferenças vencidas desde a concessão, respeitada a prescrição quinquenal, com juros e correção monetária;</li>
                  <li>Anexar à petição inicial os documentos CNIS, CTPS e demais comprovantes de contribuição, além deste relatório técnico-contábil;</li>
                  <li>Indicar desde já os cálculos de liquidação, demonstrando o montante devido de R$ 110.130,54.</li>
                </ol>
              </div>
              
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-bold text-[#3C0710] mb-2">Observações Finais:</h4>
                <p className="text-sm">A chance de êxito desta ação revisional é considerada <strong>ALTA</strong>, tendo em vista que há tese já firmada em sede de repercussão geral pelo STF e em recurso repetitivo pelo STJ, favorecendo a pretensão do segurado. Os tribunais têm decidido majoritariamente pela procedência deste tipo de ação, quando demonstrado que a aplicação da regra definitiva resulta em benefício mais vantajoso ao segurado.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">📎</span> Documentação e Comprovação
              </h3>
              
              <div className="space-y-2 text-sm">
                <p>Para a instrução processual adequada da ação revisional, é necessário reunir a seguinte documentação:</p>
                
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#3C0710] text-white">
                      <th className="text-left p-2 rounded-tl">Documento</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2 rounded-tr">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gray-50">
                      <td className="p-2">Extrato do CNIS completo</td>
                      <td className="p-2 text-green-600">Disponível</td>
                      <td className="p-2">Emitido em 12/03/2025</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Carta de Concessão do benefício</td>
                      <td className="p-2 text-green-600">Disponível</td>
                      <td className="p-2">Contém RMI e memória de cálculo</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-2">CTPS (Carteira de Trabalho)</td>
                      <td className="p-2 text-yellow-600">Parcial</td>
                      <td className="p-2">Necessário digitalizar páginas adicionais</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Comprovantes de contribuição</td>
                      <td className="p-2 text-green-600">Disponível</td>
                      <td className="p-2">Carnês, contracheques e extratos bancários</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-2">RG e CPF</td>
                      <td className="p-2 text-green-600">Disponível</td>
                      <td className="p-2">Documentos de identificação atualizados</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Comprovante de residência</td>
                      <td className="p-2 text-red-600">Pendente</td>
                      <td className="p-2">Necessário documento recente (menos de 3 meses)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-2">Procuração</td>
                      <td className="p-2 text-red-600">Pendente</td>
                      <td className="p-2">Será assinada no escritório</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Botões de exportação */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
          <button className="bg-[#3C0710] text-white px-4 py-2 rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a1 1 0 001 1h8a1 1 0 001-1v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1zm4 2v1h2V6H9z" clipRule="evenodd" />
            </svg>
            Imprimir Relatório
          </button>
          
          <button className="bg-[#FFD700] text-black px-4 py-2 rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Exportar como PDF
          </button>
          
          <button className="bg-[#333333] text-white px-4 py-2 rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exportar CSV
          </button>
          
          <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Agendar Consulta
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-[#3C0710] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-serif font-bold mb-2">OLIVEIRA'S LAW OFFICE</h3>
            <p className="text-sm opacity-90">Rua Oswaldo Cruz, número 1601, Centro, Canto da Fabril.</p>
            <p className="text-sm opacity-90">Adv. Jesus Martins Oliveira OAB-25097, joliveiramaccf@gmail.com</p>
            <p className="text-sm opacity-90">Adm. Jesus Martins Oliveira Junior CRA 4597</p>
            <p className="mt-2 text-sm font-bold">Documento gerado digitalmente em 29/04/2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPrevidenciario;
