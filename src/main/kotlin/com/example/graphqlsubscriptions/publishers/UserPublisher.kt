package com.example.graphqlsubscriptions.publishers

import org.springframework.stereotype.Component
import org.reactivestreams.Publisher;
import reactor.core.publisher.DirectProcessor
import reactor.core.publisher.FluxProcessor
import reactor.core.publisher.FluxSink

@Component
class UserPublisher(
    private val processor: FluxProcessor<String, String> = DirectProcessor.create<String?>().serialize(),
    private val sink: FluxSink<String> = processor.sink()
) {



    fun publish(str: String) {
        // Whenever we publish something it is fed to the sink.
        // Sink then passes it to the processor
        sink.next(str)
    }

    fun queryTriggered(): Publisher<String> {
        return processor.map {
            println("publishing string: $it")
            it
        }
    }
}