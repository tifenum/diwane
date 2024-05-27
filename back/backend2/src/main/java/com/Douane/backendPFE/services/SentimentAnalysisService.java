/*package com.Douane.backendPFE.services;


import org.tensorflow.TensorFlow;
import org.tensorflow.Graph;
import org.tensorflow.Session;
import org.tensorflow.Tensor;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class SentimentService {

    private byte[] graphDef;

    public SentimentService() {
        try {
            graphDef = Files.readAllBytes(Paths.get("path_to_your_model.pb"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public double predictSentiment(String review) {
        try (Graph g = new Graph()) {
            g.importGraphDef(graphDef);
            try (Session s = new Session(g);
                 Tensor<String> t = Tensor.create(review.getBytes())) {
                Tensor<?> result = s.runner().feed("input_tensor", t).fetch("output_tensor").run().get(0);
                return result.floatValue();
            }
        }
    }
}
*/
