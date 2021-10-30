package com.hevlar.semantic.semanticjava;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GreetingControllerTest {

    GreetingController greetingController = new GreetingController();

    @Test
    void greet_return_hello_name() {
        String actual = greetingController.Greet("Dennis");
        assertEquals(actual, "Hello Dennis");
    }
}