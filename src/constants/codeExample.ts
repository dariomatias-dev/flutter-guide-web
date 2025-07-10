export const codeExample = `
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: GradientCard(),
      ),
    ),
  );
}

class GradientCard extends StatelessWidget {
  const GradientCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: <Color>[
              Color(0xFF2563EB),
              Color(0xFF22D3EE),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Container(
            width: 260,
            height: 460,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: <Color>[
                  Color(0xFF3B82F6),
                  Color(0xFF06B6D4),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(32.0),
              border: Border.all(
                color: const Color(0xFF27272a),
                width: 16.0,
              ),
            ),
            child: const Center(
              child: Text(
                'Flutter!',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.1,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
  `;
