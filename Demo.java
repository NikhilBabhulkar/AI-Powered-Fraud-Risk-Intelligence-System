/*
 * FOUR PILLARS OF JAVA OOP - COMPREHENSIVE INTERVIEW GUIDE
 * 
 * This program demonstrates all four fundamental principles of Object-Oriented Programming:
 * 1. ABSTRACTION
 * 2. INHERITANCE
 * 3. ENCAPSULATION
 * 4. POLYMORPHISM
 */

// ============================================================================
// PILLAR 1: ABSTRACTION
// ============================================================================
/*
 * WHAT IS ABSTRACTION?
 * - Abstraction means hiding the implementation details and showing only the functionality
 * - It focuses on WHAT an object does rather than HOW it does it
 * - Achieved through abstract classes and interfaces
 * 
 * INTERVIEW POINTS:
 * - Reduces complexity by hiding unnecessary details
 * - Achieved using 'abstract' keyword (0-100% abstraction) or interfaces (100% abstraction)
 * - Abstract class can have both abstract and concrete methods
 * - Cannot create objects of abstract classes directly
 * - Abstract methods have no body and must be implemented by child classes
 */

abstract class Animal {
    // Protected: accessible in same package and subclasses
    protected String name;
    
    // Constructor of abstract class
    public Animal(String name) {
        this.name = name;
    }
    
    // Abstract method - NO implementation (no body)
    // Child classes MUST provide implementation
    // This is abstraction: we define WHAT to do, not HOW to do it
    abstract void makeSound();
    
    // Concrete method - HAS implementation
    // Child classes inherit this as-is or can override it
    public void sleep() {
        System.out.println(name + " is sleeping...");
    }
}

// ============================================================================
// PILLAR 2: INHERITANCE
// ============================================================================
/*
 * WHAT IS INHERITANCE?
 * - Mechanism where one class acquires properties and behaviors of another class
 * - Establishes IS-A relationship (Dog IS-A Animal)
 * - Promotes code reusability and establishes parent-child relationship
 * 
 * INTERVIEW POINTS:
 * - Uses 'extends' keyword for classes, 'implements' for interfaces
 * - Java supports: Single, Multilevel, Hierarchical inheritance
 * - Java does NOT support multiple inheritance (to avoid diamond problem)
 * - Child class inherits all non-private members of parent class
 * - 'super' keyword refers to parent class (constructor, methods, variables)
 * - Types: Single (A->B), Multilevel (A->B->C), Hierarchical (A->B, A->C)
 */

class Dog extends Animal {
    // Dog's own property (not inherited)
    private String breed;
    
    // Constructor
    public Dog(String name, String breed) {
        // 'super' calls parent class constructor
        // Must be first statement in child constructor
        super(name);
        this.breed = breed;
    }
    
    // Implementing abstract method from parent class
    // @Override annotation indicates we're overriding parent method
    @Override
    void makeSound() {
        System.out.println(name + " says: Woof! Woof!");
    }
    
    // Dog's own method (not inherited)
    public String getBreed() {
        return breed;
    }
}

// Another child class inheriting from Animal (Hierarchical Inheritance)
class Cat extends Animal {
    public Cat(String name) {
        super(name); // Calling parent constructor
    }
    
    // Cat's implementation of abstract method
    @Override
    void makeSound() {
        System.out.println(name + " says: Meow! Meow!");
    }
}

// ============================================================================
// PILLAR 3: ENCAPSULATION
// ============================================================================
/*
 * WHAT IS ENCAPSULATION?
 * - Wrapping data (variables) and code (methods) together as a single unit
 * - Data hiding: restricting direct access to some object's components
 * - Achieved by making fields private and providing public getter/setter methods
 * 
 * INTERVIEW POINTS:
 * - Also called "Data Hiding"
 * - Provides control over data (validation, read-only, write-only access)
 * - Makes class easy to maintain and flexible
 * - Increases security by hiding sensitive data
 * - Achieved using access modifiers: private, protected, public, default
 * - Follows JavaBean convention: private fields + public getters/setters
 * - Real-world example: Medicine capsule (ingredients are hidden inside)
 */

class BankAccount {
    // Private fields - CANNOT be accessed directly from outside the class
    // This is DATA HIDING - core concept of encapsulation
    private String accountNumber;
    private double balance;
    
    // Constructor to initialize the object
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    // Public GETTER method - provides READ access to private field
    // Controlled access: we decide what to expose
    public String getAccountNumber() {
        return accountNumber;
    }
    
    // Public GETTER method for balance
    public double getBalance() {
        return balance;
    }
    
    // Public method to modify private data with VALIDATION
    // This is the power of encapsulation: controlled modification
    // We can add business logic, validation, logging, etc.
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount + " | New Balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    // Another controlled method with validation logic
    // Direct access to 'balance' would bypass this validation
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount + " | New Balance: $" + balance);
        } else {
            System.out.println("Insufficient funds!");
        }
    }
    
    // Note: No setter for accountNumber - making it READ-ONLY after creation
    // This demonstrates fine-grained control over data access
}

// ============================================================================
// PILLAR 4: POLYMORPHISM
// ============================================================================
/*
 * WHAT IS POLYMORPHISM?
 * - Ability of an object to take many forms
 * - "Poly" = many, "morphism" = forms
 * - One interface, multiple implementations
 * 
 * INTERVIEW POINTS:
 * - Two types: Compile-time (Static) and Runtime (Dynamic)
 * 
 * 1. COMPILE-TIME POLYMORPHISM (Method Overloading):
 *    - Same method name, different parameters (number, type, or order)
 *    - Resolved at compile time
 *    - Also called Static Binding or Early Binding
 *    - Return type alone is NOT sufficient for overloading
 * 
 * 2. RUNTIME POLYMORPHISM (Method Overriding):
 *    - Child class provides specific implementation of parent class method
 *    - Resolved at runtime based on object type
 *    - Also called Dynamic Binding or Late Binding
 *    - Requires inheritance and @Override annotation (recommended)
 *    - Method signature must be exactly same as parent
 */

class Calculator {
    // METHOD OVERLOADING - Compile-time Polymorphism
    // Same method name "add" but different parameters
    
    // Version 1: Two integer parameters
    public int add(int a, int b) {
        System.out.println("Calling add(int, int)");
        return a + b;
    }
    
    // Version 2: Two double parameters (different parameter TYPE)
    public double add(double a, double b) {
        System.out.println("Calling add(double, double)");
        return a + b;
    }
    
    // Version 3: Three integer parameters (different parameter COUNT)
    public int add(int a, int b, int c) {
        System.out.println("Calling add(int, int, int)");
        return a + b + c;
    }
    
    // Compiler decides which method to call based on arguments
    // This decision happens at COMPILE TIME
}

// ============================================================================
// MAIN CLASS - DEMONSTRATION OF ALL FOUR PILLARS
// ============================================================================
public class Demo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════════════════╗");
        System.out.println("║     FOUR PILLARS OF JAVA OOP - INTERVIEW PREPARATION      ║");
        System.out.println("╚════════════════════════════════════════════════════════════╝\n");
        
        // ========================================================================
        // PILLAR 1: ABSTRACTION DEMO
        // ========================================================================
        System.out.println("┌─────────────────────────────────────────────────────────┐");
        System.out.println("│ 1. ABSTRACTION                                          │");
        System.out.println("└─────────────────────────────────────────────────────────┘");
        System.out.println("Key Points:");
        System.out.println("  ✓ Hides implementation details, shows only functionality");
        System.out.println("  ✓ Abstract class cannot be instantiated");
        System.out.println("  ✓ Abstract methods must be implemented by child classes\n");
        
        // Cannot do: Animal animal = new Animal("Test"); // ERROR!
        // Abstract classes cannot be instantiated
        
        Dog dog = new Dog("Buddy", "Golden Retriever");
        Cat cat = new Cat("Whiskers");
        
        dog.makeSound();  // Dog's implementation
        cat.makeSound();  // Cat's implementation
        dog.sleep();      // Inherited concrete method from Animal
        
        // ========================================================================
        // PILLAR 2: INHERITANCE DEMO
        // ========================================================================
        System.out.println("\n┌─────────────────────────────────────────────────────────┐");
        System.out.println("│ 2. INHERITANCE                                          │");
        System.out.println("└─────────────────────────────────────────────────────────┘");
        System.out.println("Key Points:");
        System.out.println("  ✓ Establishes IS-A relationship (Dog IS-A Animal)");
        System.out.println("  ✓ Promotes code reusability");
        System.out.println("  ✓ Child inherits all non-private members of parent\n");
        
        System.out.println(dog.name + " is a " + dog.getBreed());
        System.out.println("Dog class inherited:");
        System.out.println("  - 'name' field from Animal");
        System.out.println("  - 'sleep()' method from Animal");
        System.out.println("  - Must implement 'makeSound()' abstract method");
        
        // ========================================================================
        // PILLAR 3: ENCAPSULATION DEMO
        // ========================================================================
        System.out.println("\n┌─────────────────────────────────────────────────────────┐");
        System.out.println("│ 3. ENCAPSULATION                                        │");
        System.out.println("└─────────────────────────────────────────────────────────┘");
        System.out.println("Key Points:");
        System.out.println("  ✓ Data hiding using private access modifier");
        System.out.println("  ✓ Controlled access via public getter/setter methods");
        System.out.println("  ✓ Provides validation and security\n");
        
        BankAccount account = new BankAccount("ACC123", 1000.0);
        
        // Cannot do: account.balance = 5000; // ERROR! balance is private
        // This is data hiding - we must use public methods
        
        System.out.println("Account: " + account.getAccountNumber());
        System.out.println("Initial Balance: $" + account.getBalance());
        account.deposit(500);      // Controlled modification with validation
        account.withdraw(200);     // Controlled modification with validation
        account.withdraw(2000);    // Will fail due to validation logic
        
        // ========================================================================
        // PILLAR 4: POLYMORPHISM DEMO
        // ========================================================================
        System.out.println("\n┌─────────────────────────────────────────────────────────┐");
        System.out.println("│ 4. POLYMORPHISM                                         │");
        System.out.println("└─────────────────────────────────────────────────────────┘");
        System.out.println("Key Points:");
        System.out.println("  ✓ Compile-time: Method Overloading (same name, diff params)");
        System.out.println("  ✓ Runtime: Method Overriding (parent-child relationship)\n");
        
        // COMPILE-TIME POLYMORPHISM (Method Overloading)
        System.out.println("A) Compile-time Polymorphism (Method Overloading):");
        Calculator calc = new Calculator();
        System.out.println("Result: " + calc.add(5, 3));           // Calls add(int, int)
        System.out.println("Result: " + calc.add(5.5, 3.2));       // Calls add(double, double)
        System.out.println("Result: " + calc.add(1, 2, 3));        // Calls add(int, int, int)
        
        // RUNTIME POLYMORPHISM (Method Overriding)
        System.out.println("\nB) Runtime Polymorphism (Method Overriding):");
        System.out.println("Parent reference, Child object:");
        
        // Parent type reference, but Dog object
        Animal animal1 = new Dog("Max", "Labrador");
        // Parent type reference, but Cat object
        Animal animal2 = new Cat("Mittens");
        
        // JVM decides at RUNTIME which makeSound() to call based on actual object
        animal1.makeSound(); // Calls Dog's makeSound() - Dynamic Binding
        animal2.makeSound(); // Calls Cat's makeSound() - Dynamic Binding
        
        System.out.println("\nNote: Method called depends on OBJECT type, not reference type");
        
        // ========================================================================
        // SUMMARY FOR INTERVIEWS
        // ========================================================================
        System.out.println("\n╔════════════════════════════════════════════════════════════╗");
        System.out.println("║ QUICK INTERVIEW SUMMARY                                    ║");
        System.out.println("╠════════════════════════════════════════════════════════════╣");
        System.out.println("║ 1. ABSTRACTION   → Hide implementation, show functionality ║");
        System.out.println("║ 2. INHERITANCE   → Code reusability, IS-A relationship    ║");
        System.out.println("║ 3. ENCAPSULATION → Data hiding, controlled access         ║");
        System.out.println("║ 4. POLYMORPHISM  → One interface, many forms              ║");
        System.out.println("╚════════════════════════════════════════════════════════════╝");
    }
}
