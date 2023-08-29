package com.example.graphqlsubscriptions.datafetcher

import com.netflix.dgs.codegen.generated.types.User
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.DgsSubscription
import reactor.core.publisher.Flux
import java.time.Duration
import org.reactivestreams.Publisher;

@DgsComponent
class UserDatafetcher {

    @DgsQuery
    fun getAllUsers(): List<User> {
        return listOf(
            User("asdf", "asda"),
            User("asasdfdf", "aserteda"),
            User("asasdfdf", "aertsda")
        )
    }

    @DgsSubscription
    fun userEditedNotification(): Publisher<String> {
        return Flux.interval(Duration.ofSeconds(1)).map{ t -> "$t" }
    }
}