package com.example.graphqlsubscriptions.datafetcher

import com.example.graphqlsubscriptions.publishers.UserPublisher
import com.netflix.dgs.codegen.generated.types.User
import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.DgsSubscription
import reactor.core.publisher.Flux
import java.time.Duration
import org.reactivestreams.Publisher;

@DgsComponent
class UserDatafetcher(
    private val userPublisher: UserPublisher
) {

    @DgsQuery
    fun getAllUsers(): List<User> {
        userPublisher.publish("getting all users")
        return listOf(
            User("asdf", "asda"),
            User("asasdfdf", "aserteda"),
            User("asasdfdf", "aertsda")
        )
    }

    @DgsSubscription
    fun userEditedNotification(): Publisher<String> {
        return userPublisher.queryTriggered()
    }
}