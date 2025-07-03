export const codeExample = `
import 'package:flutter/material.dart';

// A custom card with a gradient and shadow
class GradientCard extends StatelessWidget {
  const GradientCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 250,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Colors.blue, Colors.cyan],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.blue.withOpacity(0.4),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: const Center(
        child: Text(
          'Flutter!',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
  `;
