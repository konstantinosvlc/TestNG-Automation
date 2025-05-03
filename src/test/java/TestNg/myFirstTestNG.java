package TestNg;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import com.github.javafaker.Faker;

import java.time.Duration;
import java.util.Random;


public class myFirstTestNG {

    WebDriver driver;
    Faker faker;


    @BeforeTest
    public void prepare() throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        faker = new Faker();
        driver.manage().window().maximize();
        driver.get("https://www.google.com");
        Thread.sleep(200);
    }

    @AfterTest
    public void finish() throws InterruptedException {

       driver.quit();

    }

    @Test(priority = 0)
    public void GetBaseUrl() {
        driver.navigate().to("https://awesomeqa.com/ui/");
    }

    @Test(priority = 1)
    public void Authentication() throws InterruptedException {
        //GenerateRandom Email and Password
        String randomEmail = faker.internet().emailAddress();
        String randomPassword = faker.internet().password();
        String randomPhone= faker.phoneNumber().phoneNumber();
        //Sign Up with Them and Log Out
        driver.findElement(By.className("caret")).click();
        driver.findElement(By.linkText("Register")).click();
        driver.findElement(By.id("input-firstname")).sendKeys("Random");
        driver.findElement(By.id("input-lastname")).sendKeys("Guy");
        driver.findElement(By.id("input-email")).sendKeys(randomEmail);
        driver.findElement(By.id("input-telephone")).sendKeys(randomPhone);
        driver.findElement(By.id("input-password")).sendKeys(randomPassword);
        driver.findElement(By.id("input-confirm")).sendKeys(randomPassword);
        driver.findElement(By.name("agree")).click();
        driver.findElement(By.xpath("//input[@value='Continue']")).click();
        driver.findElement(By.linkText("Continue")).click();
        driver.findElement(By.xpath("//div[@id='top-links']/ul/li[2]/a/span")).click();
        driver.findElement(By.linkText("Logout")).click();
        //Sign In with the New Account
        Thread.sleep(1000);
        driver.findElement(By.className("caret")).click();
        driver.findElement(By.linkText("Login")).click();
        driver.findElement(By.cssSelector("#input-email")).sendKeys(randomEmail);
        driver.findElement(By.cssSelector("#input-password")).sendKeys(randomPassword);
        Thread.sleep(200);
        driver.findElement(By.cssSelector("input[value='Login']")).click();
    }

    @Test(priority = 2)
    public void AddToCart() throws InterruptedException {
        //Search into Add to Cart
        driver.findElement(By.cssSelector("input[placeholder='Search']")).sendKeys("iMac");
driver.findElement(By.cssSelector("button[class='btn btn-default btn-lg']")).click();
driver.findElement(By.cssSelector("div[class='caption'] h4 a")).click();
driver.findElement(By.cssSelector("#button-cart")).click();
Thread.sleep(500);
driver.findElement(By.cssSelector(".btn.btn-inverse.btn-block.btn-lg.dropdown-toggle")).click();
driver.findElement(By.cssSelector("body > header:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > p:nth-child(2) > a:nth-child(1) > strong:nth-child(1)")).click();

    }
    @Test (priority = 3)
    public void Checkout() throws InterruptedException {
        //Random CheckOut Values
        String randomFirstname=faker.name().firstName();
        String randomLastname=faker.name().lastName();
        String randomAddress=faker.address().streetAddress();
        String randomCity=faker.address().cityName();
        String randomPostcode=faker.address().zipCode();

//Checkout Process
        driver.findElement(By.cssSelector("a[class='btn btn-primary']")).click();
        Thread.sleep(300);
        driver.findElement(By.cssSelector("#input-payment-firstname")).sendKeys(randomFirstname);
        driver.findElement(By.cssSelector("#input-payment-lastname")).sendKeys(randomLastname);
        driver.findElement(By.cssSelector("#input-payment-address-1")).sendKeys(randomAddress);
        driver.findElement(By.cssSelector("#input-payment-city")).sendKeys(randomCity);
        driver.findElement(By.cssSelector("#input-payment-postcode")).sendKeys(randomPostcode);
        WebElement dropdown1 = driver.findElement(By.cssSelector("#input-payment-country"));
        Select selectObject=new Select(dropdown1);
        selectObject.selectByIndex(new Random().nextInt(1,10));
Thread.sleep(200);
        WebElement dropdown2 = driver.findElement(By.cssSelector("#input-payment-zone"));
        Select selectObject1=new Select(dropdown2);
        selectObject1.selectByIndex(new Random().nextInt(1,10));

        driver.findElement(By.id("button-payment-address")).click();
        //Delivery Details
        WebDriverWait wait4 = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait4.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#button-shipping-address")));
        driver.findElement(By.cssSelector("#button-shipping-address")).click();
        WebDriverWait wait = new WebDriverWait (driver, Duration.ofSeconds(1));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("button-shipping-method")));
        driver.findElement(By.id("button-shipping-method")).click();
        WebDriverWait wait1= new WebDriverWait(driver, Duration.ofSeconds(1));
        wait1.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[value='1']")));
        driver.findElement(By.cssSelector("input[value='1']")).click();
        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait2.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#button-payment-method")));
        driver.findElement(By.cssSelector("#button-payment-method")).click();
        WebDriverWait wait3 = new WebDriverWait(driver, Duration.ofSeconds(1));
        wait3.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#button-confirm")));
        driver.findElement(By.cssSelector("#button-confirm")).click();
Thread.sleep(3000);



    }
}


















