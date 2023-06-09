import 'package:flutter/material.dart';

class FormStudent extends StatelessWidget {
  FormStudent({super.key});

  final formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
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
            decoration: const InputDecoration(labelText: 'Select option 1'),
          ),
          DropdownButtonFormField<String>(
            items: ['Sim', 'Não']
                .map((label) => DropdownMenuItem(
                      value: label,
                      child: Text(label),
                    ))
                .toList(),
            onChanged: (value) {},
            decoration: const InputDecoration(labelText: 'Select option 2'),
          ),
          TextFormField(
            decoration: const InputDecoration(labelText: 'Enter text'),
          ),
        ],
      ),
    );
  }
}
