package liiga

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LiigaPerfTest extends Simulation {

  // var liiga_uri = sys.env("LIIGA_URI")

  val httpConf = http
    .baseURL("http://localhost:8800")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  object AvaaEtusivun {
    val get =
      exec(http("juurisivu").get("/").check(regex("script src")))
      .exec(http("hae logo").get("/common/img/logo-pieni.png"))
      .exec(http("hae kayttajatiedot").get("/public-api/liiga/user"))
      .exec(http("hae bundle.js").get("/bundle.js"))
  }

  object Otteluohjelma {
    val get = exec(
      http("hae tulevat ottelut").get("/public-api/liiga/1/ottelut/tulevat")
        .check(jsonPath("$[0].otteluId").saveAs("oid")))
      .exec(http("hae listan ensimmmäinen ottelu").get("/public-api/liiga/ottelu/${oid}"))
  }

  val scn = scenario("SimuloiLiiganKayttajia")
    .exec(AvaaEtusivun.get)
    .pause(3)
    .exec(Otteluohjelma.get)

  setUp(scn.inject(rampUsers(10) over (1 seconds)))
    .protocols(httpConf)
    .assertions(global.failedRequests.count.lessThan(1))
    .assertions(global.responseTime.mean.lessThan(100))

}


