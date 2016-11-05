# Mathulator
A handy expression calculator with support for variables and custom macros.

![Screenshot 1](https://github.com/CaelanStewart/Mathulator/blob/master/screenshots/Screen%20Shot%202016-11-05%20at%2017.33.33.png?raw=true)
![Screenshot 1](https://github.com/CaelanStewart/Mathulator/blob/master/screenshots/Screen%20Shot%202016-11-05%20at%2017.33.42.png?raw=true)

## Install (cli)

### Step 1: Install Node
See: https://nodejs.org/en/download/

### Step 2: Clone
Open your favourite command line application.
```
> cd ~
> git clone https://github.com/CaelanStewart/Mathulator.git
```

### Step 3: Run
Again, in your favourite command line application.
```
> cd ~/Mathulator
> npm start
```

## Install (executable)
Follow the instructions for the cli install, then continue here.

### Step 1: Install `electron-packager`
Open your favourite command line application.
```
> npm install -g electron-packager
```
*Note: you may have to use `sudo` if you get a permissions error.*

### Step 2: Package Mathulator
Again, in your favourite command line application.
```
> electron-packager ~/Mathulator --platform=darwin --arch=x64
```
*Note: run `electron-packager --help` for more info on available arguments.*

### Step 3: Run
`electron-packager` will tell you where it saved the exectutable in the command-line output. Navigate to it, and open it like any other application.


## Basic Usage
We'll start off with the basics.

### `1+1` or `1 +   1`?
Irrelevant. Whitespace is mostly ignored.
```
> 1 +    1
= 2
```

### Parentheses
You may use parentheses to control the order of operations, otherwise operators are applied in the standard order of operations.
```
> (3*10)^8
= 656100000000

> 3*10^8
= 300000000
```

### Scientific Notation
You may use the common form of scientific notation (`3e8`) instead of using the exponent operator (`^`).
```
> 3e8
= 300000000
```

### Functions
Mathulator supports a variety of mathematical functions (see below for list).
```
> sin(rad(90))
= 1
```

### Variables
Variables can be used to store values - variables persist through sessions.
```
> light_speed=3e8
= 300000000

> distance=200000
= 200000

> time=distance/light_speed
= 0.0006666666666666666
```

### Macros
You may define your own macros for common operations - macros persist through sessions.
```
> hypo{a,b}=sqrt(a*a+b*b)
=

> hypo(10,14)
= 17.204650534085253
```

### Supported Math Functions
Mathulator supports a variety of functions. Here is a good ol' simple list.

- **`abs(x)`** - Returns the absolute value of a number.
- **`acos(x)`** - Returns the arccosine of a number.
- **`acosh(x)`** - Returns the hyperbolic arccosine of a number.
- **`asin(x)`** - Returns the arcsine of a number.
- **`asinh(x)`** - Returns the hyperbolic arcsine of a number.
- **`atan(x)`** - Returns the arctangent of a number.
- **`atanh(x)`** - Returns the hyperbolic arctangent of a number.
- **`atan2(y,x)`** - Returns the arctangent of the quotient of its arguments.
- **`cbrt(x)`** - Returns the cube root of a number.
- **`ceil(x[,y])`** - Returns the smallest integer greater than or equal to a number, or a multiple of `y`.
- **`clz32(x)`** - Returns the number of leading zeroes of a 32-bit integer.
- **`cos(x)`** - Returns the cosine of a number.
- **`cosh(x)`** - Returns the hyperbolic cosine of a number.
- **`deg(r)`** - Returns `r` radians in degrees.
- **`exp(x)`** - Returns Ex, where x is the argument, and E is Euler's constant (2.718…), the base of the natural logarithm.
- **`expm1(x)`** - Returns subtracting 1 from exp(x).
- **`fact(x)`** - Returns the factorial of `x`.
- **`fib(n)`** - Returns the `n`th Fibonacci number
- **`floor(x[,y])`** - Returns the largest integer less than or equal to a number, or a multiple of `y`.
- **`fround(x)`** - Returns the nearest single precision float representation of a number.
- **`hypot(x[,y[, ...]])`** - Returns the square root of the sum of squares of its arguments.
- **`imul(x,y)`** - Returns the result of a 32-bit integer multiplication.
- **`log(x)`** - Returns the natural logarithm (loge, also ln) of a number.
- **`log1p(x)`** - Returns the natural logarithm (loge, also ln) of 1 + x for a number x.
- **`log10(x)`** - Returns the base 10 logarithm of a number.
- **`log2(x)`** - Returns the base 2 logarithm of a number.
- **`max([x[,y[, ...]])`** - Returns the largest of zero or more numbers.
- **`min([x[,y[, ...]])`** - Returns the smallest of zero or more numbers.
- **`pow(x,y)`** - Returns `x` raised to the power of `y`.
- **`rad(d)`** - Returns `d` degrees in radians.
- **`rand(min,max)`** - Returns a pseudo-random number between `min` and `max`.
- **`randf()`** - Returns a random float between 0 (inc.) and 1 (exc.).
- **`round(x[,y])`** - Returns the value of a number rounded to the nearest integer, or a multiple of `y`
- **`sign(x)`** - Returns the sign of the x, indicating whether x is positive, negative or zero.
- **`sin(x)`** - Returns the sine of a number.
- **`sinh(x)`** - Returns the hyperbolic sine of a number.
- **`sqrt(x)`** - Returns the positive square root of a number.
- **`tan(x)`** - Returns the tangent of a number.
- **`tanh(x)`** - Returns the hyperbolic tangent of a number.
