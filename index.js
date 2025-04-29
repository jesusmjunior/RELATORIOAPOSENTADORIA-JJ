import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardPrevidenciario = () => {
  const [activeTab, setActiveTab] = useState('resumo');

  // Dados do segurado
  const seguradoData = {
    nome: "ANTONIO FRANCISCO BEZERRA",
    cpf: "094.805.283-04",
    dataNascimento: "11/01/1954",
    nit: "112.54588.29-3",
    nomeMae: "FRANCISCA AMARAL BEZERRA",
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
      salarioAtual: 6518.75
    },
    correto: {
      salario: 4321.03,
      fator: 0.9282,
      media: 4655.28,
      salarioAtual: 7611.64
    },
    diferenca: {
      mensal: 617.05,
      percentual: 16.66,
      acumulada: 110130.54,
      mensal2025: 1092.89
    }
  };

  // Dados de evolução do benefício
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

  // Detalhamento dos vínculos empregatícios
  const vinculosEmpregaticiosData = [
    { seq: 1, empresa: "SEDEL ENGENHARIA LTDA", inicio: "12/05/1977", fim: "14/01/1981", cnpj: "06.049.282/0001-06" },
    { seq: 2, empresa: "TELECOMUNICACOES DO MARANHAO S.A", inicio: "20/01/1981", fim: "09/2001", cnpj: "06.274.633/0001-74" },
    { seq: 3, empresa: "TELEMAR NORTE LESTE S/A - EM RECUPERACAO JUDICIAL", inicio: "20/01/1981", fim: "10/05/2016", cnpj: "33.000.118/0062-90" },
    { seq: 4, empresa: "Empregado Doméstico", inicio: "01/11/1989", fim: "31/03/1990", tipo: "RECOLHIMENTO" },
    { seq: 5, empresa: "Empregado Doméstico", inicio: "01/05/1990", fim: "31/10/1990", tipo: "RECOLHIMENTO" },
    { seq: 6, empresa: "Segurado Especial", inicio: "04/01/2001", fim: "-", tipo: "SEGURADO ESPECIAL" },
    { seq: 7, empresa: "TELEMAR NORTE LESTE S/A - EM RECUPERACAO JUDICIAL", inicio: "01/04/2002", fim: "-", cnpj: "33.000.118/0062-90" },
    { seq: 8, empresa: "Benefício - APOSENTADORIA POR TEMPO DE CONTRIBUICAO", inicio: "11/12/2014", fim: "ATIVO", nb: "1715169210" }
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

  // Cores para gráficos
  const COLORS = ['#3C0710', '#333333', '#FFD700'];

  // Custom formatter para tooltips
  const formatTooltipValue = (value) => {
    if (typeof value === 'number') {
      if (value > 1000) {
        return formatarMoeda(value);
      }
      return value;
    }
    return value;
  };

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

      {/* Banner principal */}
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
                <p className="text-2xl font-bold">{formatarMoeda(comparativoData.diferenca.mensal2025)}</p>
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
                  <span>2025: {formatarMoeda(comparativoData.diferenca.mensal2025)}</span>
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

            {/* Resumo do caso e erros */}
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
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span> Erros Identificados no Cálculo
                </h3>
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  <li>Contagem incorreta do número de contribuições (215 vs. 45 válidas)</li>
                  <li>Aplicação inadequada da regra dos 80% maiores salários (172 de 215, em vez de 36 de 45)</li>
                  <li>Desconsideração de 37 períodos contributivos relevantes que deveriam ser incluídos</li>
                  <li>Cálculo incorreto do fator previdenciário (0,9373 vs. 0,9282)</li>
                  <li>Aplicação da regra de transição quando a regra definitiva era mais vantajosa</li>
                </ol>
                <div className="mt-4 bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] p-3 rounded text-sm">
                  <p className="font-semibold">Observação importante:</p>
                  <p>O segurado faz jus à aplicação da regra definitiva (art. 29, I da Lei 8.213/91) por ser mais vantajosa que a regra de transição (art. 3º da Lei 9.876/99).</p>
                </div>
              </div>
            </div>

            {/* Gráficos e valor devido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                  <span className="mr-2">📊</span> Comparativo de Cálculos
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { categoria: 'Total de Contribuições', inss: parametrosData[0].inss, correto: parametrosData[0].auditoria },
                        { categoria: 'Contribuições (80%)', inss: parametrosData[1].inss, correto: parametrosData[1].auditoria },
                        { categoria: 'Contrib. Reaproveitadas', inss: parametrosData[2].inss, correto: parametrosData[2].auditoria },
                        { categoria: 'Média Salarial (x1000)', inss: parametrosData[3].inss/1000, correto: parametrosData[3].auditoria/1000 },
                        { categoria: 'Salário Benefício (x1000)', inss: parametrosData[5].inss/1000, correto: parametrosData[5].auditoria/1000 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="categoria" />
                      <YAxis />
                      <Tooltip formatter={formatTooltipValue} />
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
                          label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
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
                            <td className="p-2 text-right font-bold text-[#FFD700] rounded-br-md">
                              {formatarMoeda(montanteDevidoData.reduce((sum, item) => sum + item.value, 0))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gráfico de evolução */}
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
              </div>
          </div>
        )}

        {/* Tab: Análise Técnica */}
        {activeTab === 'analise' && (
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-4 flex items-center">
                <span className="mr-2">🔍</span> Análise Técnica do Cálculo Previdenciário
              </h3>
              
              <div className="mb-4">
                <p className="mb-2">Foi aplicada análise paramétrica avançada aos dados do CNIS e Carta de Concessão do segurado, com processamento estatístico para identificação precisa dos 80% maiores salários de contribuição, conforme exigido pela Lei 8.213/91.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#3C0710] mb-2">Parâmetros Processados:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-[#3C0710] text-white">
                          <th className="text-left p-2 rounded-tl">Parâmetro</th>
                          <th className="text-center p-2">INSS</th>
                          <th className="text-center p-2">Auditoria</th>
                          <th className="text-center p-2 rounded-tr">Diferença</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parametrosData.map((item, index) => (
                          <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                            <td className="p-2">{item.parametro}</td>
                            <td className="p-2 text-center">
                              {item.parametro.includes('R$') 
                                ? formatarMoeda(item.inss)
                                : formatarNumero(item.inss, item.parametro === 'Fator previdenciário' ? 4 : 0)}
                            </td>
                            <td className="p-2 text-center">
                              {item.parametro.includes('R$') 
                                ? formatarMoeda(item.auditoria)
                                : formatarNumero(item.auditoria, item.parametro === 'Fator previdenciário' ? 4 : 0)}
                            </td>
                            <td className={`p-2 text-center font-bold ${item.diferenca > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
                  <h4 className="font-bold text-[#3C0710] mb-2">Análise Comparativa:</h4>
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
                        <td className="p-2">38,14 anos</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-bold">a</td>
                        <td className="p-2">Alíquota (Lei 8.213/91)</td>
                        <td className="p-2">0,31</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="p-2 font-bold">Es</td>
                        <td className="p-2">Expectativa de Sobrevida (IBGE)</td>
                        <td className="p-2">21,8 anos</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-bold">Id</td>
                        <td className="p-2">Idade na DER</td>
                        <td className="p-2">60,92 anos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h4 className="font-bold text-[#3C0710] mb-2">Processamento do Cálculo:</h4>
                  <ol className="list-decimal ml-5 text-sm">
                    <li className="mb-2">Tc × a = 38,14 × 0,31 = <strong>11,82</strong></li>
                    <li className="mb-2">(Tc × a) ÷ Es = 11,82 ÷ 21,8 = <strong>0,5423</strong></li>
                    <li className="mb-2">1 + (Id + Tc × a) ÷ 100 = 1 + (60,92 + 11,82) ÷ 100 = <strong>1,7274</strong></li>
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
            
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-serif font-bold text-[#3C0710] border-b pb-2 mb-3 flex items-center">
                <span className="mr-2">📑</span> Tabela de Valores Históricos
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
            </div>
          </div>
        )}

        {/* Tab: Análise CNIS */}
        {activeTab === 'cnis' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    <div className="flex-1">{seguradoData.nomeMae}</div>
                  </div>
                  <div className="flex">
                    <div className="w-40 font-medium">Data Filiação INSS:</div>
                    <div className="flex-1">12/05/1977</div>
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
              
              <div className="bg-white p-4 rounded-lg shadow col-span-1">
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
                        <td className="p-2 text-center">{item.fim}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.fim === "ATIVO" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {item.fim === "ATIVO" ? "Ativo" : "Encerrado"}
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
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-[#3C0710] mb-2">Superior Tribunal de Justiça - STJ:</h4>
                
                <div className="bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700] p-4 mb-4 rounded">
                  <h5 className="font-bold text-[#3C0710] mb-1">Tema 999/STJ - Recurso Repetitivo:</h5>
                  <p className="text-sm mb-2"><strong>Tese Firmada:</strong> "Aplica-se a regra definitiva prevista no art. 29, I e II da Lei 8.213/1991, na apuração do salário de benefício, quando mais favorável do que a regra de transição contida no art. 3º da Lei 9.876/1999, aos Segurados que ingressaram no Regime Geral da Previdência Social até o dia anterior à publicação da Lei 9.876/1999."</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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
