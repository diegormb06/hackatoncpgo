// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class FormStudent extends StatefulWidget {
  const FormStudent({Key? key}) : super(key: key);

  @override
  _FormStudentState createState() => _FormStudentState();
}

class _FormStudentState extends State<FormStudent> {
  final scaffoldKey = GlobalKey<ScaffoldState>();
  final formKey = GlobalKey<FormState>();
  String? pergunta1;
  String? pergunta2;
  String? texto;

  Future<void> parseApiResponse(String response) async {
    try {
      Map<String, dynamic> data = json.decode(response);
      bool indiciosBullying = data['indicios_bullying'];
      bool indiciosViolencia = data['indicios_violencia'];
      String risco = data['risco'];

      Map<String, dynamic> e = {
        'serie': '7° Ano',
        'turma': '1° A',
        'indicios_bullyng': indiciosBullying,
        'indicios_violencia': indiciosViolencia,
        'risco': risco,
      };

      String jsonData2 = jsonEncode(e);
      final response2 = await http.post(
        Uri.parse('https://api.autofastapp.com.br/hackaton'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonData2,
      );

      if (response2.statusCode >= 200 && response2.statusCode < 300) {
        print('cadastrou no banco');
      } else {
        print('cdigo de erroooo: ${response2.statusCode}');
      }
    } catch (e) {
      print('deu ruim $e');
    }
  }

  void _submitForm() {
    if (formKey.currentState!.validate()) {
      formKey.currentState!.save();

      Map<String, dynamic> data = {
        'pergunta1': pergunta1,
        'pergunta2': pergunta2,
        'texto': texto,
        'api_key': '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',
      };

      String jsonData = jsonEncode(data);

      _envioIa(jsonData);
    } else {
      setState(() {});
    }
  }

  Future<void> _envioIa(String jsonData) async {
    try {
      final response = await http.post(
        Uri.parse('https://api-flask-aluno-campus.herokuapp.com/api'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonData,
      );
      if (response.statusCode >= 200 && response.statusCode < 300) {
        parseApiResponse(response.body);
        print('recebeu da ia');
      } else {
        print('cdigo de erro: ${response.statusCode}');
      }

      Navigator.of(context).pop();
    } catch (e) {
      print('internet: $e');

      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Form(
        key: formKey,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (pergunta1 == null)
                    const Text(
                      'Campo obrigatório',
                      style: TextStyle(fontSize: 10, color: Colors.red),
                    ),
                  const Text(
                    'Na última semana, algum aluno pode ter se sentido inseguro, com medo ou intimidado em algum momento?*',
                    style: TextStyle(fontSize: 14),
                  ),
                  DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      isExpanded: true,
                      value: pergunta1,
                      hint: const Text('Selecione uma opção'),
                      onChanged: (value) {
                        setState(() {
                          pergunta1 = value;
                        });
                      },
                      items: ['Sim', 'Não']
                          .map((label) => DropdownMenuItem(
                                value: label,
                                child: Text(label),
                              ))
                          .toList(),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (pergunta2 == null)
                    const Text(
                      'Campo obrigatório',
                      style: TextStyle(fontSize: 10, color: Colors.red),
                    ),
                  const Text(
                    'Na última semana, houve situações em que algum aluno desta turma teve dificuldades em lidar com a frustração ou com a rejeição?',
                    style: TextStyle(fontSize: 14),
                  ),
                  DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      isExpanded: true,
                      value: pergunta2,
                      hint: const Text('Selecione uma opção'),
                      onChanged: (value) {
                        setState(() {
                          pergunta2 = value;
                        });
                      },
                      items: ['Sim', 'Não']
                          .map((label) => DropdownMenuItem(
                                value: label,
                                child: Text(label),
                              ))
                          .toList(),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 2),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Escreva como foi a última semana',
                    style: TextStyle(fontSize: 16),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey),
                      borderRadius: BorderRadius.circular(5),
                    ),
                    child: TextFormField(
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.all(8),
                      ),
                      maxLines: 3,
                      maxLength: 135,
                      onChanged: (value) {
                        setState(() {
                          texto = value;
                        });
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Campo obrigatório';
                        }
                        return null;
                      },
                      style: TextStyle(
                        color: (texto == null || texto!.isEmpty)
                            ? Colors.red
                            : null,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: _submitForm,
              child: const Text('Enviar'),
            ),
          ],
        ),
      ),
    );
  }
}
