import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorSchemeSeed: const Color(0xff6750a4),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: GestureDetector(
          onTap: () {
            showModalBottomSheet<void>(
              context: context,
              builder: (BuildContext context) {
                return SizedBox(
                  height: 400,
                  child: Column(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.all(15),
                        child: Form(
                          child: Column(
                            children: [
                              DropdownButtonFormField<String>(
                                items: ['Sim', 'Não']
                                    .map((label) => DropdownMenuItem(
                                          value: label,
                                          child: Text(label),
                                        ))
                                    .toList(),
                                onChanged: (value) {},
                                decoration: const InputDecoration(
                                    labelText: 'Select option 1'),
                              ),
                              DropdownButtonFormField<String>(
                                items: ['Sim', 'Não']
                                    .map((label) => DropdownMenuItem(
                                          value: label,
                                          child: Text(label),
                                        ))
                                    .toList(),
                                onChanged: (value) {},
                                decoration: const InputDecoration(
                                    labelText: 'Select option 2'),
                              ),
                              TextFormField(
                                decoration: const InputDecoration(
                                    labelText: 'Enter text'),
                              ),
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                );
              },
            );
          },
          child: Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('lib/assets/image.jpeg'),
                fit: BoxFit.contain,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
